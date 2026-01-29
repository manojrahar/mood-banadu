import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import MoodSelector from "./MoodSelector";
import Footer from "./Footer";
import AICard from "./AICard";
import HowItWorks from "./HowItWorks";
import WhyMoodBanadu from "./WhyMoodBanadu";

const Home = () => {
  
  const [activeMood, setActiveMood] = useState(null);

  const aiCardsData = [
    {
      id: 1,
      img: "https://i.pinimg.com/originals/ea/77/43/ea77431d8420854305055b0511ce6266.jpg",
      message: "Discover new recipes tailored to your mood.",
      button: "Cook This",
    },
    {
      id: 2,
      img: "https://m.media-amazon.com/images/I/61ygTdD3mDL.jpg",
      message: "Listen while you cook and make cooking fun.",
      button: "Play Music",
    },
    {
      id: 3,
      img: "https://i.pinimg.com/originals/67/c0/63/67c06374f834373de99ee78c5625938f.jpg",
      message: "Watch while you eat. Movie that matches your vibe.",
      button: "Watch Movie",
    },
  ];

  async function askAI(mood) {
  try {
    console.log("Asking AI for mood:", mood);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `User mood is ${mood}. Suggest food, music, and movie.`,
        }),
      }
    );

    const data = await response.json();
    console.log("AI response:", data);

  } catch (error) {
      console.error("AI error:", error);
    }
  }

  useEffect(() => {
    if (!activeMood) return;

    askAI(activeMood);
  }, [activeMood]);


  return (
    <main className="relative w-full">
      <div className="flex flex-col pt-7 w-full items-center">
        <Navbar />
        <Hero />

        <MoodSelector
          activeMood={activeMood}
          setActiveMood={setActiveMood}
        />

        <div className="flex gap-8">
          {aiCardsData.map((card) => (
            <AICard
              key={card.id}
              img={card.img}
              message={card.message}
              button={card.button}
              mood={activeMood}
            />
          ))}
        </div>

        <HowItWorks />
        <WhyMoodBanadu />
        <Footer />
        <div>
          <h1>API</h1>
          <button onClick={askAI} className="px-5 py-2 bg-amber-950 text-white m-5 rounded-full">API Button</button>
        </div>
      </div>
    </main>
  );
};

export default Home;
