"use client"

import FinanceTracker from "../finance-tracker"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <SignedIn>
        {/* User is signed in, show the FinanceTracker */}
        <div className="absolute top-4 right-4 z-50">
          <UserButton afterSignOutUrl="/" />
        </div>
        <FinanceTracker />
      </SignedIn>
      <SignedOut>
        {/* User is signed out, show sign-in/sign-up options */}
        <div className="flex flex-col items-center space-y-6 p-8 rounded-lg shadow-lg bg-gray-800 border border-gray-700 text-white">
          <h1 className="text-3xl font-bold text-gray-200">Welcome to Cash Flow Analyzer</h1>
          <p className="text-gray-400 text-lg text-center max-w-md">
            Please sign in or sign up to manage your personal finances.
          </p>
          <div className="flex space-x-4">
            <SignInButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>
    </div>
  )
}
