import { useState } from "react";

function MainPage() {
  const [isClient, setIsClient] = useState(true);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex rounded-md sm:rounded-lg shadow-md border border-black overflow-hidden">
            <button
              onClick={() => setIsClient(true)}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-medium border-r border-gray-200 transition-colors ${
                isClient
                  ? "bg-berry text-white"
                  : "bg-white text-grape hover:text-berry"
              }`}
            >
              Hire Talent
            </button>
            <button
              onClick={() => setIsClient(false)}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-medium transition-colors ${
                !isClient
                  ? "bg-grape text-white"
                  : "bg-white text-berry hover:text-grape"
              }`}
            >
              Find Work
            </button>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight ${
              isClient ? "text-berry" : "text-grape"
            }`}
          >
            {isClient
              ? "Local Help You Can Trust"
              : "Your Skills, Your Community"}
          </h1>

          <p
            className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto px-4 ${
              isClient ? "text-berry/90" : "text-grape/90"
            }`}
          >
            {isClient
              ? "Find trusted help nearby. No platform fees. Just real neighbours."
              : "Earn what you deserve. Help your community. Zero commission."}
          </p>

          <button
            className={`px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 rounded-lg text-sm sm:text-base md:text-lg font-semibold transition-colors shadow-lg hover:scale-101 ${
              isClient
                ? "bg-berry text-white hover:bg-berry-dark"
                : "bg-grape text-white hover:bg-grape-dark"
            }`}
          >
            {isClient ? "Get Started Free" : "Join Now Free"}
          </button>
        </div>
      </div>
    </>
  );
}

export default MainPage;
