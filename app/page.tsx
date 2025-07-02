import { CoursesSection } from "@/components/courses-section";
import Hero from "@/components/hero";
import StudentBenefits from "@/components/student-benefits";

export default function Home() {
  return (
    <main>
      <Hero />
      <StudentBenefits />
      <CoursesSection />
    </main>
  );
}
