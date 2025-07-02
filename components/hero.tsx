import { BookOpenIcon } from "lucide-react";
import Link from "next/link";
import { AnimatedProfilesGrid } from "./animated-profile-grid";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-16 pb-16 md:pb-24 flex flex-col md:flex-row items-center justify-between">
      {/* Left side - Text content */}
      <div className="w-full md:w-1/2 mb-12 md:mb-0 pr-0 md:pr-8">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
          Empowering Students with Personalized Mentorship <BookOpenIcon className="inline ml-2" size={42} />
        </h1>
        <p className="text-xl mb-8">
          EduVibe connects students with experienced mentors to guide them through their academic journey
        </p>
        <Button asChild className="px-8 py-6 bg-black text-white rounded-md hover:bg-gray-800 transition text-lg font-medium">
          <Link href={"/get-started"}>Get Started</Link>
        </Button>
      </div>
      {/* Right side - Image collage */}
      <AnimatedProfilesGrid />
    </section>
  );
};
export default Hero;
