'use client';

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="flex items-center justify-center">
            <SignUp
                appearance={{
                    elements: {
                        rootBox: "w-full",
                        card: "bg-transparent border-0 shadow-none",
                        formButtonPrimary: "yellow-btn w-full",
                        footerActionLink: "text-yellow-500 hover:text-yellow-400",
                        formFieldInput: "bg-gray-800 border-gray-600 text-white",
                        formFieldLabel: "text-gray-300",
                        headerTitle: "text-white text-2xl font-bold",
                        headerSubtitle: "text-gray-400",
                    },
                }}
            />
        </div>
    );
}
