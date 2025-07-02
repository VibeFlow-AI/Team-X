"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { registerStudent } from "@/server/actions/student";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// Student Registration Schema
const studentSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  age: z.coerce.number().min(13, { message: "Must be at least 13 years old" }).max(99, { message: "Age seems unrealistic" }),
  educationLevel: z.enum(["High School", "Undergraduate", "Graduate", "Other"], {
    required_error: "Please select your education level",
  }),
  interests: z.string().optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

export default function StudentOnboardingForm({ defaultName, defaultEmail }: { defaultName: string; defaultEmail: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    mode: "onChange",
    defaultValues: {
      fullName: defaultName,
      email: defaultEmail,
      age: undefined,
      educationLevel: "High School",
      interests: "",
    },
  });

  const onSubmit: SubmitHandler<StudentFormData> = async (data) => {
    try {
      setSubmitting(true);
      setError(null);
      const result = await registerStudent(data);

      if (!result.success) {
        setError(result.error || "Registration failed");
        return;
      }

      router.push("/student/dashboard");
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Student Onboarding</h1>

        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

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
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <Input
              type="number"
              {...register("age", { valueAsNumber: true })}
              placeholder="Enter your age"
              className={`mt-1 ${errors.age ? "border-red-500" : ""}`}
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Education Level</label>
            <Select
              onValueChange={(value: "High School" | "Undergraduate" | "Graduate" | "Other") =>
                setValue("educationLevel", value, { shouldValidate: true })
              }
            >
              <SelectTrigger className={errors.educationLevel ? "border-red-500" : ""}>
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High School">High School</SelectItem>
                <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                <SelectItem value="Graduate">Graduate</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.educationLevel && <p className="text-red-500 text-xs mt-1">{errors.educationLevel.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Interests (Optional)</label>
            <Input {...register("interests")} placeholder="Your academic or career interests" className="mt-1" />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3" disabled={submitting}>
            {submitting ? "Registering..." : "Complete Registration"}
          </Button>
        </form>
      </div>
    </div>
  );
}
