import calm from "../assets/calm.png";
import happy from "../assets/happy.png";
import heart from "../assets/romance.png";
import energetic from "../assets/energetic.png";
import sad from "../assets/sad.png";

const moods = [
  { key: "happy", label: "Happy", img: happy },
  { key: "sad", label: "Sad", img: sad },
  { key: "romantic", label: "Romantic", img: heart },
  { key: "energetic", label: "Energetic", img: energetic },
  { key: "calm", label: "Calm", img: calm },
];

const MoodButton = ({ mood, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center
        lg:px-3 py-2
        rounded-xl
        transition-all duration-200
        ${
          isActive
            ? "bg-orange-100 text-orange-600 scale-105"
            : "hover:bg-gray-100 active:scale-95"
        }
      `}
      aria-pressed={isActive}
    >
      <img
        src={mood.img}
        alt={mood.label}
        className="h-16 md:h-16 object-cover"
      />
      <span className="text-xs sm:text-sm font-medium">
        {mood.label}
      </span>
    </button>
  );
};

const MoodSelector = ({ activeMood, setActiveMood }) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        mx-4 my-6
        px-2 py-2
        border border-zinc-100
        shadow-xl/30
        max-w-full
        overflow-x-auto
      "
    >
      <div className="flex gap-0 lg:gap-3  justify-start sm:justify-center">
        {moods.map(mood => (
          <MoodButton
            key={mood.key}
            mood={mood}
            isActive={activeMood === mood.key}
            onClick={() => setActiveMood(mood.key)}
          />
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
