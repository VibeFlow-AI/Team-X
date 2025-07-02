"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerMentor } from "@/server/actions/mentor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Mentor Registration Schema
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

type MentorFormData = z.infer<typeof mentorSchema>;

export default function MentorOnboardingForm({ defaultName, defaultEmail }: { defaultName: string; defaultEmail: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<MentorFormData>({
    resolver: zodResolver(mentorSchema),
    mode: "onChange",
    defaultValues: {
      fullName: defaultName,
      email: defaultEmail,
      profession: "",
      yearsOfExperience: undefined,
      expertiseAreas: [],
      linkedin: "",
    },
  });

  const expertiseAreas = watch("expertiseAreas", []);

  const toggleExpertiseArea = (area: string) => {
    const currentAreas = expertiseAreas || [];
    const newAreas = currentAreas.includes(area) ? currentAreas.filter((a) => a !== area) : [...currentAreas, area];
    setValue("expertiseAreas", newAreas);
  };

  const expertiseOptions = [
    "Software Engineering",
    "Data Science",
    "Machine Learning",
    "Web Development",
    "Cybersecurity",
    "Cloud Computing",
    "Artificial Intelligence",
  ];

  const onSubmit: SubmitHandler<MentorFormData> = (data) => {
    startTransition(async () => {
      const result = await registerMentor(data);

      if (result.success) {
        toast.success("Registration successful! Redirecting...");
        // The page will automatically redirect due to the revalidatePath in the server action
        router.push("/mentor/dashboard");
      } else {
        toast.error(result.error || "Something went wrong");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-800">Mentor Onboarding</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <Input
              {...register("fullName")}
              placeholder="Enter your full name"
              className={`mt-1 ${errors.fullName ? "border-red-500" : ""}`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Profession</label>
            <Input
              {...register("profession")}
              placeholder="Your current profession"
              className={`mt-1 ${errors.profession ? "border-red-500" : ""}`}
            />
            {errors.profession && <p className="text-red-500 text-xs mt-1">{errors.profession.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
            <Input
              type="number"
              {...register("yearsOfExperience", { valueAsNumber: true })}
              placeholder="Enter years of professional experience"
              className={`mt-1 ${errors.yearsOfExperience ? "border-red-500" : ""}`}
            />
            {errors.yearsOfExperience && <p className="text-red-500 text-xs mt-1">{errors.yearsOfExperience.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Areas of Expertise</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {expertiseOptions.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => toggleExpertiseArea(area)}
                  className={`
                    px-3 py-1 rounded-full text-sm transition-colors duration-200
                    ${expertiseAreas.includes(area) ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-green-100"}
                  `}
                >
                  {area}
                </button>
              ))}
            </div>
            {errors.expertiseAreas && <p className="text-red-500 text-xs mt-1">{errors.expertiseAreas.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn Profile (Optional)</label>
            <Input
              type="url"
              {...register("linkedin")}
              placeholder="Your LinkedIn profile URL"
              className={`mt-1 ${errors.linkedin ? "border-red-500" : ""}`}
            />
            {errors.linkedin && <p className="text-red-500 text-xs mt-1">{errors.linkedin.message}</p>}
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3" disabled={isPending}>
            {isPending ? "Registering..." : "Complete Registration"}
          </Button>
        </form>
      </div>
    </div>
  );
}
