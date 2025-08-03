// components/AuthButtons.jsx
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

export function AuthButtons() {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="text-white hover:text-gray-300 flex items-center gap-2">
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}
