import React, { useState } from "react";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [isClient, setIsClient] = useState(true);
  const navigate = useNavigate();

  const handleStart = () => {
    // Send to signup page with role info in query (optional)
    navigate(`/signup?role=${isClient ? "client" : "provider"}`);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const clientSteps = [
    {
      title: "Post",
      description: "Post your task or project for local talent to see.",
    },
    {
      title: "Connect",
      description: "Connect with skilled neighbours to discuss details.",
    },
    {
      title: "Job Done",
      description: "Hire and relax while the work gets done reliably.",
    },
  ];

  const providerSteps = [
    {
      title: "Create Profile",
      description: "Showcase your skills and experience to clients.",
    },
    {
      title: "Search Gigs",
      description: "Find local opportunities matching your expertise.",
    },
    {
      title: "Get the Job Done",
      description: "Complete tasks and grow your reputation.",
    },
  ];

  const steps = isClient ? clientSteps : providerSteps;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center text-gray-900">
        <section className="flex flex-col items-center justify-center min-h-[100vh] text-center px-6">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsClient(true)}
              className={`px-4 py-2 border rounded cursor-pointer ${
                isClient
                  ? "font-bold border-gray-900"
                  : "opacity-60 hover:opacity-100 border-gray-400"
              }`}
            >
              Hire Talent
            </button>
            <button
              onClick={() => setIsClient(false)}
              className={`px-4 py-2 border rounded cursor-pointer ${
                !isClient
                  ? "font-bold border-gray-900"
                  : "opacity-60 hover:opacity-100 border-gray-400"
              }`}
            >
              Offer Skills
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl mb-2">
            {isClient
              ? "Local Help You Can Trust"
              : "Your Skills, Your Community"}
          </h1>

          <div className="w-100 h-1 bg-gray-700 mx-auto mb-5 rounded-full"></div>

          <p className="text-base md:text-lg max-w-xl text-gray-700 mb-6">
            {isClient
              ? "Find trusted help nearby. No platform fees. Just real neighbours."
              : "Earn what you deserve. Help your community. Zero commission."}
          </p>

          <button
            onClick={handleStart}
            className="px-6 py-3 font-medium border rounded cursor-pointer transition-shadow hover:shadow-lg bg-gradient-to-r from-gray-200 to-gray-300"
          >
            {isClient ? "Get Started" : "Join Now"}
          </button>

          <p className="mt-4 text-gray-700">
            Already have an account?{" "}
            <button
              onClick={handleLogin}
              className="text-blue-600 hover:underline font-medium"
            >
              Log in
            </button>
          </p>
        </section>

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          {isClient ? "How It Works for Clients" : "How It Works for Providers"}
        </h2>

        <section className="w-full max-w-4xl flex flex-col md:flex-row gap-8 justify-center mt-10 mb-30 px-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex-1 border rounded-lg p-8 text-center shadow-sm hover:shadow-lg transition-shadow transform hover:-translate-y-1 flex flex-col items-center"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full mb-4 font-bold text-gray-900 text-lg bg-gradient-to-r from-gray-200 to-gray-300">
                {idx + 1}
              </div>
              <div className="text-xl font-semibold mb-2">{step.title}</div>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </section>

        <section className="text-center mb-20 space-y-4 flex flex-col items-center justify-center min-h-[30vh] px-6">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to start?</h2>
          <p className="text-gray-700 max-w-md mx-auto">
            Post your task or offer your skills now and join the community.
          </p>
          <button
            onClick={handleStart}
            className="px-6 py-3 font-medium border rounded cursor-pointer transition-shadow hover:shadow-lg bg-gradient-to-r from-gray-200 to-gray-300"
          >
            {isClient ? "Get Started" : "Join Now"}
          </button>
        </section>
      </div>
    </>
  );
}
