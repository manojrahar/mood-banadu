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
        flex flex-col
        transition-transform ease-out
        hover:scale-110
        ${isActive ? "scale-110 ease-out font-bold text-orange-600" : ""}
      `}
    >
      <img src={mood.img} alt={mood.label} className="h-20" />
      <span className="text-sm font-medium ">{mood.label}</span>
    </button>
  );
};

const MoodSelector = ({ activeMood, setActiveMood }) => {
  return (
    <div className="bg-white rounded-full m-8 px-6 py-4 flex justify-center border border-zinc-100 shadow-xl/30">
      {moods.map((mood) => (
        <MoodButton
          key={mood.key}
          mood={mood}
          isActive={activeMood === mood.key}
          onClick={() => setActiveMood(mood.key)}
        />
      ))}
    </div>
  );
};

export default MoodSelector;
