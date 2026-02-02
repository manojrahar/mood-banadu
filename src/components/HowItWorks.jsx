import { MdDoubleArrow } from "react-icons/md";

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="w-full border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-center font-bold text-2xl sm:text-3xl lg:text-4xl mb-10">
          How It Works
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          
          {/* Step 1 */}
          <div className="bg-white border border-zinc-100 shadow-xl/30 rounded-3xl p-5 w-full max-w-sm text-center">
            <h3 className="font-bold text-lg sm:text-xl text-gray-800 border-b border-gray-100 pb-2">
              1. Pick your mood
            </h3>
            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Choose how you're feeling right now — happy, sad, romantic,
              energetic, or calm.
            </p>
          </div>

          {/* Arrow */}
          <MdDoubleArrow
            className="
              rotate-90 md:rotate-0
              text-gray-400
              w-5 h-5
              md:w-10 md:h-10
              lg:w-12 lg:h-12
              flex-shrink-0
            "
          />

          {/* Step 2 */}
          <div className="bg-white border border-zinc-100 shadow-xl/30 rounded-3xl p-5 w-full max-w-sm text-center">
            <h3 className="font-bold text-lg sm:text-xl text-gray-800 border-b border-gray-100 pb-2">
              2. AI understands the vibe
            </h3>
            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Our AI analyzes your mood and curates the right food, music,
              and movies for you.
            </p>
          </div>

          {/* Arrow */}
          <MdDoubleArrow
            className="
              rotate-90 md:rotate-0
              text-gray-400
              w-5 h-5
              md:w-10 md:h-10
              lg:w-12 lg:h-12
              flex-shrink-0
            "
          />

          {/* Step 3 */}
          <div className="bg-white border border-zinc-100 shadow-xl/30 rounded-3xl p-5 w-full max-w-sm text-center">
            <h3 className="font-bold text-lg sm:text-xl text-gray-800 border-b border-gray-100 pb-2">
              3. Enjoy the experience
            </h3>
            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Cook the perfect recipe, vibe with the right music,
              & watch that fits the moment.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
