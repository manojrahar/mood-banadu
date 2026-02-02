import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import MoodSelector from "./MoodSelector";
import Footer from "./Footer";
import AICard from "./AICard";
import HowItWorks from "./HowItWorks";
import WhyMoodBanadu from "./WhyMoodBanadu";
import RecipeModal from "./RecipeModal";

const Home = () => {
  const moodMusicImages = {
    happy: "/music/happy-music.png",
    sad: "/music/sad-music.png",
    calm: "/music/calm-music.png",
    energetic: "/music/energetic-music.png",
    romantic: "/music/romantic-music.png",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [activeMood, setActiveMood] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  /* ---------------- AI TEXT PARSER ---------------- */
  function parseAiText(text) {
    const result = { food: "", music: "", movie: "" };

    const foodMatch = text.match(/Food:\s*([\s\S]*?)\n\n/i);
    const musicMatch = text.match(/Music:\s*([\s\S]*?)\n\n/i);
    const movieMatch = text.match(/Movie:\s*([\s\S]*)$/i);

    if (foodMatch) result.food = foodMatch[1].trim();
    if (musicMatch) result.music = musicMatch[1].trim();
    if (movieMatch) result.movie = movieMatch[1].trim();

    return result;
  }

  /* ---------------- ASK AI ---------------- */
  async function askAI(mood) {
    try {
      setIsLoading(true);

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood }),
      });

      const data = await res.json();
      const choices = data?.result?.choices;

      if (!choices?.length) return;

      const parsed = parseAiText(choices[0].message.content);
      setAiData(parsed);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  /* ---------------- FOOD HELPERS ---------------- */
  function extractMainFood(food) {
    const commonFoods = [
      "chicken","pizza","pasta","rice","noodles",
      "burger","salad","soup","oatmeal","cake","fish","egg"
    ];

    const lower = food.toLowerCase();
    return commonFoods.find(item => lower.includes(item)) || lower.split("")[0];
  }

  async function fetchRecipe(food) {
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${food}&number=1&apiKey=${import.meta.env.VITE_SPOONACULAR_KEY}`
      );
      const data = await res.json();

      if (data?.results?.length) {
        fetchRecipeDetails(data.results[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchRecipeDetails(id) {
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_SPOONACULAR_KEY}`
      );
      const data = await res.json();
      setRecipe(data);
    } catch (err) {
      console.error(err);
    }
  }

  /* ---------------- MOVIE HELPERS ---------------- */
  function cleanMovieName(movie) {
    return movie.replace(/\(\d{4}\)/g, "").trim();
  }

  async function fetchMovie(movieName) {
    try {
      const searchRes = await fetch(
        `https://api.watchmode.com/v1/search/?apiKey=${import.meta.env.VITE_WATCHMODE_KEY}&search_field=name&search_value=${encodeURIComponent(movieName)}&types=movie`
      );
      const searchData = await searchRes.json();

      if (!searchData?.title_results?.length) return;

      const movieId = searchData.title_results[0].id;

      const detailRes = await fetch(
        `https://api.watchmode.com/v1/title/${movieId}/details/?apiKey=${import.meta.env.VITE_WATCHMODE_KEY}&append_to_response=sources`
      );
      const detailData = await detailRes.json();

      setMovieDetails(detailData);
    } catch (err) {
      console.error(err);
    }
  }

  function openWatchLink() {
    if (!movieDetails?.sources?.length) return;

    const preferred = ["Netflix", "Amazon", "Prime", "Disney", "Apple"];
    const safeSource =
      movieDetails.sources.find(src =>
        preferred.some(p => src.name?.toLowerCase().includes(p.toLowerCase()))
      ) || movieDetails.sources[0];

    window.open(safeSource.web_url, "_blank");
  }

  function openSpotifySearch() {
    if (!aiData?.music) return;
    window.open(
      `https://open.spotify.com/search/${encodeURIComponent(aiData.music)}`,
      "_blank"
    );
  }

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    if (activeMood) askAI(activeMood);
  }, [activeMood]);

  useEffect(() => {
    if (aiData?.food) fetchRecipe(extractMainFood(aiData.food));
    if (aiData?.movie) fetchMovie(cleanMovieName(aiData.movie));
  }, [aiData]);

  /* ---------------- UI ---------------- */
  return (
    <main className="w-full">
      <Navbar />
      <Hero />

      <div className="px-4 sm:px-6 lg:px-10 flex flex-col items-center">
        <MoodSelector
          activeMood={activeMood}
          setActiveMood={setActiveMood}
        />

        {isLoading && (
          <p className="mt-4 text-sm animate-pulse text-center">
            Loading recommendations based on your mood…
          </p>
        )}

        {/* AI Cards */}
        <div className="mt-8 flex flex-col md:flex-row md:gap-12 lg:flex-row items-center lg:gap-16 w-full max-w-6xl">
            <AICard
              img={recipe?.image}
              message={recipe?.title || "Finding recipe for your mood..."}
              button="Cook This"
              onClick={() => recipe && setShowRecipeModal(true)}
            />

            <AICard
              img={moodMusicImages[activeMood]}
              message={aiData?.music || "Finding music for your mood..."}
              button="Play Music"
              onClick={openSpotifySearch}
            />

            <AICard
              img={movieDetails?.poster || movieDetails?.posterMedium}
              message={movieDetails?.title || "Finding movie for your mood..."}
              button="Watch Movie"
              onClick={openWatchLink}
            />
        </div>

        <HowItWorks />
        <WhyMoodBanadu />
      </div>
      <Footer />

      {showRecipeModal && (
        <RecipeModal
          recipe={recipe}
          onClose={() => setShowRecipeModal(false)}
        />
      )}
    </main>
  );
};

export default Home;
