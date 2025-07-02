import { BookOpenIcon } from "lucide-react";

const Hero = () => {
  const profileImages = [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
  ];
  return (
    <div className="w-full px-6 md:px-12 lg:px-16 py-16 md:py-24 flex flex-col md:flex-row items-center">
      {/* Left side - Text content */}
      <div className="w-full md:w-1/2 mb-12 md:mb-0 pr-0 md:pr-8">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
          Empowering Students with Personalized Mentorship <BookOpenIcon className="inline ml-2" size={42} />
        </h1>
        <p className="text-xl mb-8">
          EduVibe connects students with experienced mentors to guide them through their academic journey
        </p>
        <button className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition text-lg font-medium">
          Get Started
        </button>
      </div>
      {/* Right side - Image collage */}
      <div className="w-full md:w-1/2 relative h-[500px]">
        <div className="absolute top-0 right-0 w-40 h-56 rounded-full overflow-hidden">
          <img src={profileImages[0]} alt="Mentor" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-12 right-48 w-36 h-48 rounded-full overflow-hidden">
          <img src={profileImages[1]} alt="Student" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-72 right-0 w-44 h-60 rounded-full overflow-hidden">
          <img src={profileImages[2]} alt="Mentor" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-64 right-52 w-40 h-52 rounded-full overflow-hidden">
          <img src={profileImages[3]} alt="Student" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-36 left-12 w-48 h-64 rounded-full overflow-hidden">
          <img src={profileImages[4]} alt="Mentor" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 left-48 w-32 h-44 rounded-full overflow-hidden">
          <img src={profileImages[5]} alt="Student" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-0 left-24 w-40 h-52 rounded-full overflow-hidden">
          <img src={profileImages[6]} alt="Mentor" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};
export default Hero;
