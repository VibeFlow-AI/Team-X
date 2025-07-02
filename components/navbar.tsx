import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { BookOpenIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 md:px-12 lg:px-16 flex items-center justify-between bg-white">
      <div className="flex items-center">
        <BookOpenIcon size={28} className="text-black" />
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-black hover:text-gray-700">
          Home
        </Link>
        <a href="/sessions" className="text-black hover:text-gray-700">
          Sessions
        </a>
        <a href="#" className="text-black hover:text-gray-700">
          About
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">Log In</button>
          </SignInButton>
          <SignUpButton>
            <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">Sign Up</button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Button asChild>
            <Link href="/get-started">Dashboard</Link>
          </Button>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};
export default Navbar;
