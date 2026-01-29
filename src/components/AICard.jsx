const AICard = ({ img, message, button, mood }) => {

  const moodText = {
    happy: "Feeling happy? Let’s keep the good vibes going 🎉",
    sad: "Tough day? Comfort choices just for you 🤍",
    energetic: "High energy detected! Let’s use it ⚡",
    calm: "Slow, peaceful, and relaxing choices 🌿",
    romantic: "Something warm and cozy for the moment 💕",
  };

  return (
    <div className="bg-white h-64 w-96 rounded-3xl flex p-3 mb-8 relative border-zinc-100 border shadow-gray-500 shadow-xl/30 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-2xl">
      
      {/* Image */}
      <img
        className="max-w-45 min-w-40 rounded-3xl"
        src={img}
        alt=""
      />

      {/* Badge */}
      <p className="bg-indigo-500 shadow-indigo-500 shadow-xl/30 text-white px-2.5 py-0.5 rounded-2xl absolute right-4 text-sm">
        AI Recommended
      </p>

      {/* Message */}
      <p className="text-center relative top-10 p-4 text-lg font-bold text-gray-600">
        {mood ? moodText[mood] : message}
      </p>

      {/* Action Button */}
      <button className="bg-teal-200 text-teal-700 px-3 py-0.5 rounded-2xl absolute bottom-3 right-9 text-lg font-bold transition-all duration-300 hover:bg-opacity-90 hover:scale-105">
        {button}
      </button>
    </div>
  );
};

export default AICard;
