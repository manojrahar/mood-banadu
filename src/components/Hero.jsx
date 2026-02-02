import heroImage from "../assets/final.png";

const Hero = () => {
  return (
    <section className="w-full border-b border-gray-200">
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-10
          py-10 sm:py-10
          flex flex-col-reverse
          md:flex-row
          items-center
          gap-8
        "
      >
        {/* Text */}
        <h1
          className="
            text-center md:text-left
            font-bold
            text-3xl sm:text-4xl lg:text-5xl
            max-w-xl
            leading-tight
          "
        >
          AI-curated recipes, music, and movies.
          <br />
          <span className="text-gray-700">
            Based on your mood
          </span>
        </h1>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={heroImage}
            alt="Mood-based AI recommendations illustration"
            className="w-full max-w-md md:max-w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
