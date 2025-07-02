"use server";

import { prisma } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const mentorSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  profession: z.string().min(2, { message: "Profession is required" }),
  yearsOfExperience: z.coerce
    .number()
    .min(1, { message: "Experience must be at least 1 year" })
    .max(50, { message: "Experience seems unrealistic" }),
  expertiseAreas: z.array(z.string()).min(1, { message: "Select at least one expertise area" }),
  linkedin: z.string().url({ message: "Invalid LinkedIn profile URL" }).optional(),
});

export async function registerMentor(formData: z.infer<typeof mentorSchema>) {
  try {
    const validatedData = mentorSchema.parse(formData);
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const mentor = await prisma.mentor.create({
      data: {
        id: user.id,
        name: validatedData.fullName,
        email: validatedData.email,
        profession: validatedData.profession,
        yearsOfExperience: validatedData.yearsOfExperience,
        expertiseAreas: validatedData.expertiseAreas,
        linkedin: validatedData.linkedin || null,
      },
    });

    const client = await clerkClient();

    // Update the user's role in Clerk
    await client.users.updateUserMetadata(user.id, {
      publicMetadata: {
        role: "mentor",
      },
    });

    revalidatePath("/get-started/mentor");
    return { success: true, data: mentor };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid form data" };
    }
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return { success: false, error: "Email already registered" };
    }
    return { success: false, error: "Something went wrong" };
  }
}
