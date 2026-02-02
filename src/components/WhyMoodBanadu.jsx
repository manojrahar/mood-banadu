const WhyMoodBanadu = () => {
  return (
    <section
      id="why-mood-banadu"
      className="w-full border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-center font-bold text-2xl sm:text-3xl lg:text-4xl mb-10">
          Why Mood Banadu?
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          
          {/* Card 1 */}
          <div className="bg-white border border-zinc-100 shadow-xl/30 rounded-3xl p-5 w-full max-w-sm text-center">
            <h3 className="font-bold text-lg sm:text-xl text-gray-800 border-b border-gray-100 pb-2">
              One Complete Experience
            </h3>
            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Mood Banadu curates food, music, and movies together —
              all based on how you feel.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-zinc-100 shadow-xl/30 rounded-3xl p-5 w-full max-w-sm text-center">
            <h3 className="font-bold text-lg sm:text-xl text-gray-800 border-b border-gray-100 pb-2">
              AI-Powered, Not Random
            </h3>
            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Recommendations aren’t generic. AI understands mood to suggest what truly fits.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-zinc-100 shadow-xl/30 rounded-3xl p-5 w-full max-w-sm text-center">
            <h3 className="font-bold text-lg sm:text-xl text-gray-800 border-b border-gray-100 pb-2">
              Built for Real Life Moments
            </h3>
            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Designed around real habits — cooking, eating,
              and relaxing — not just browsing.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyMoodBanadu;
