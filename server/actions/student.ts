"use server";

import { prisma } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const studentSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  age: z.coerce.number().min(13).max(99),
  educationLevel: z.enum(["High School", "Undergraduate", "Graduate", "Other"]),
  interests: z.string().optional(),
});

export async function registerStudent(formData: z.infer<typeof studentSchema>) {
  try {
    const validatedData = studentSchema.parse(formData);
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const student = await prisma.student.create({
      data: {
        id: user.id,
        name: validatedData.fullName,
        email: validatedData.email,
        age: validatedData.age,
        educationLevel: validatedData.educationLevel,
        interests: validatedData.interests || null,
      },
    });

    const client = await clerkClient();

    await client.users.updateUserMetadata(user.id, {
      publicMetadata: {
        role: "student",
      },
    });

    revalidatePath("/get-started/student");
    return { success: true, data: student };
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
