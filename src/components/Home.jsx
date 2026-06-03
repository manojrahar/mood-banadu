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

    // Remove any markdown bold asterisks
    const cleanText = text.replace(/\*\*/g, "");

    // Use lookaheads to capture content between keywords flexibly
    const foodMatch = cleanText.match(/Food:\s*([\s\S]*?)(?=Music:|$)/i);
    const musicMatch = cleanText.match(/Music:\s*([\s\S]*?)(?=Movie:|$)/i);
    const movieMatch = cleanText.match(/Movie:\s*([\s\S]*)$/i);

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
    const key = import.meta.env.VITE_SPOONACULAR_KEY;
    if (!key || key === "undefined" || key.includes("YOUR_")) {
      // Offline fallback
      const mockRecipes = {
        "pasta": {
          title: "Creamy Tomato Basil Pasta",
          image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600",
          extendedIngredients: [
            { id: 1, original: "8 oz Penne Pasta" },
            { id: 2, original: "2 cups Cherry Tomatoes" },
            { id: 3, original: "3 cloves Garlic, minced" },
            { id: 4, original: "1/2 cup Heavy Cream" },
            { id: 5, original: "1/4 cup Fresh Basil leaves" },
            { id: 6, original: "1/2 cup Grated Parmesan cheese" }
          ],
          instructions: "<ol><li>Boil pasta according to package instructions until al dente.</li><li>In a skillet, sauté minced garlic and cherry tomatoes in olive oil until tomatoes burst.</li><li>Stir in the heavy cream and let it simmer for 2 minutes.</li><li>Drain the pasta and toss it into the creamy tomato sauce.</li><li>Stir in fresh basil and grated Parmesan cheese. Serve hot!</li></ol>"
        },
        "cookies": {
          title: "Warm Classic Chocolate Chip Cookies",
          image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600",
          extendedIngredients: [
            { id: 1, original: "2 cups All-Purpose Flour" },
            { id: 2, original: "1/2 cup Unsalted Butter, softened" },
            { id: 3, original: "3/4 cup Brown Sugar" },
            { id: 4, original: "1 large Egg" },
            { id: 5, original: "1 tsp Vanilla Extract" },
            { id: 6, original: "1 cup Chocolate Chips" }
          ],
          instructions: "<ol><li>Preheat oven to 375°F (190°C) and line a baking sheet with parchment paper.</li><li>Cream the softened butter, brown sugar, and white sugar until light and fluffy.</li><li>Beat in the egg and vanilla extract.</li><li>Gradually blend in the flour, baking soda, and a pinch of salt.</li><li>Fold in the chocolate chips.</li><li>Drop spoonfuls of dough onto the sheet and bake for 9-11 minutes until golden. Let cool slightly.</li></ol>"
        },
        "soup": {
          title: "Warm Classic Chicken Noodle Soup",
          image: "https://images.unsplash.com/photo-1547592165-e1d17fed6005?q=80&w=600",
          extendedIngredients: [
            { id: 1, original: "2 cups Shredded Chicken" },
            { id: 2, original: "4 cups Chicken Broth" },
            { id: 3, original: "1 cup Egg Noodles" },
            { id: 4, original: "1/2 cup Carrots, chopped" },
            { id: 5, original: "1/2 cup Celery, chopped" },
            { id: 6, original: "1/2 Onion, diced" }
          ],
          instructions: "<ol><li>In a large pot, sauté onion, carrots, and celery in olive oil until tender.</li><li>Pour in chicken broth and bring to a boil.</li><li>Add egg noodles and cook for 6-8 minutes until tender.</li><li>Stir in the shredded chicken and simmer for 5 minutes. Season with salt and pepper.</li></ol>"
        },
        "brownie": {
          title: "Decadent Double Chocolate Brownie",
          image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600",
          extendedIngredients: [
            { id: 1, original: "1/2 cup Butter" },
            { id: 2, original: "1 cup Sugar" },
            { id: 3, original: "2 Eggs" },
            { id: 4, original: "1/3 cup Cocoa Powder" },
            { id: 5, original: "1/2 cup Flour" },
            { id: 6, original: "1/2 cup Chocolate Chips" }
          ],
          instructions: "<ol><li>Preheat oven to 350°F (175°C). Grease an 8-inch square pan.</li><li>Melt butter in a saucepan. Remove from heat, and stir in sugar, eggs, and vanilla.</li><li>Beat in cocoa powder, flour, salt, and baking powder.</li><li>Fold in the chocolate chips and spread batter into the prepared pan.</li><li>Bake for 20-22 minutes. Do not overbake!</li></ol>"
        },
        "rice": {
          title: "Steamed Jasmine Rice with Salmon",
          image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600",
          extendedIngredients: [
            { id: 1, original: "1 Salmon Fillet" },
            { id: 2, original: "1 cup Jasmine Rice" },
            { id: 3, original: "1 tbsp Soy Sauce" },
            { id: 4, original: "1 tsp Sesame Oil" },
            { id: 5, original: "Fresh green onions, chopped" }
          ],
          instructions: "<ol><li>Rinse Jasmine rice and cook in a rice cooker or stovetop.</li><li>Season salmon with salt, pepper, and a drizzle of olive oil. Pan-sear or bake at 400°F for 12-15 minutes.</li><li>Serve salmon over a bed of fluffy steamed rice.</li><li>Drizzle with soy sauce and sesame oil, and garnish with green onions.</li></ol>"
        },
        "oatmeal": {
          title: "Warm Honey Chamomile Oatmeal",
          image: "https://images.unsplash.com/photo-1517686469429-8faf88b9f7ad?q=80&w=600",
          extendedIngredients: [
            { id: 1, original: "1 cup Rolled Oats" },
            { id: 2, original: "2 cups Milk or Water" },
            { id: 3, original: "2 tbsp Honey" },
            { id: 4, original: "1 Chamomile tea bag" }
          ],
          instructions: "<ol><li>Heat milk or water in a saucepan and steep chamomile.</li><li>Add oats and cook on medium-low heat for 5-7 minutes.</li><li>Once thickened, pour oatmeal into a bowl.</li><li>Drizzle honey and top with fresh berries.</li></ol>"
        },
        "wings": {
          title: "Spicy Buffalo Chicken Wings",
          image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=600",
          extendedIngredients: [
            { id: 1, original: "1 lb Chicken Wings" },
            { id: 2, original: "1/2 cup Buffalo Hot Sauce" },
            { id: 3, original: "2 tbsp Butter, melted" }
          ],
          instructions: "<ol><li>Preheat oven to 400°F (200°C).</li><li>Toss chicken wings with a little oil, salt, and pepper.</li><li>Bake/air-fry for 25-30 minutes until crispy.</li><li>Toss hot wings in buffalo hot sauce and butter.</li></ol>"
        },
        "nachos": {
          title: "Loaded Beef Nachos with Jalapeños",
          image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=600",
          extendedIngredients: [
            { id: 1, original: "1 bag Tortilla Chips" },
            { id: 2, original: "1/2 lb Ground Beef, seasoned" },
            { id: 3, original: "1 cup Cheddar & Monterey Jack cheese" }
          ],
          instructions: "<ol><li>Spread tortilla chips evenly on a baking sheet.</li><li>Brown ground beef in a skillet with taco seasoning.</li><li>Spoon seasoned beef over chips, top with cheese and jalapeños, and bake until melted.</li></ol>"
        },
        "fondue": {
          title: "Rich Chocolate Fondue with Strawberries",
          image: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=600",
          extendedIngredients: [
            { id: 1, original: "1 cup Semi-Sweet Chocolate Chips" },
            { id: 2, original: "1/2 cup Heavy Cream" },
            { id: 3, original: "Fresh Strawberries" }
          ],
          instructions: "<ol><li>Combine chocolate chips and heavy cream in a saucepan.</li><li>Heat on low, stirring constantly until melted and smooth.</li><li>Serve with fresh strawberries.</li></ol>"
        },
        "spaghetti": {
          title: "Classic Italian Spaghetti Carbonara",
          image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=600",
          extendedIngredients: [
            { id: 1, original: "8 oz Spaghetti" },
            { id: 2, original: "4 oz Pancetta or Bacon, diced" },
            { id: 3, original: "2 large Eggs" },
            { id: 4, original: "1/2 cup Grated Parmesan" }
          ],
          instructions: "<ol><li>Boil spaghetti in salted water until al dente.</li><li>Sauté bacon/pancetta until crisp.</li><li>Whisk eggs and cheese.</li><li>Toss hot pasta with bacon off heat, then mix in egg/cheese mixture quickly.</li></ol>"
        }
      };

      const matchedKey = Object.keys(mockRecipes).find(k => food.toLowerCase().includes(k));
      const fallbackRecipe = mockRecipes[matchedKey] || mockRecipes["pasta"];
      setRecipe(fallbackRecipe);
      return;
    }

    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${food}&number=1&apiKey=${key}`
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
    const key = import.meta.env.VITE_WATCHMODE_KEY;
    if (!key || key === "undefined" || key.includes("YOUR_")) {
      // Offline fallback
      const mockMovies = {
        "grand budapest": {
          title: "The Grand Budapest Hotel",
          poster: "https://images.unsplash.com/photo-1542204172-e7052809a850?q=80&w=600",
          sources: [{ name: "Amazon Prime", web_url: "https://www.amazon.com/" }]
        },
        "paddington": {
          title: "Paddington 2",
          poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600",
          sources: [{ name: "Apple TV", web_url: "https://tv.apple.com/" }]
        },
        "school of rock": {
          title: "School of Rock",
          poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600",
          sources: [{ name: "Netflix", web_url: "https://www.netflix.com/" }]
        },
        "eternal sunshine": {
          title: "Eternal Sunshine of the Spotless Mind",
          poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600",
          sources: [{ name: "Netflix", web_url: "https://www.netflix.com/" }]
        },
        "inside out": {
          title: "Inside Out",
          poster: "https://images.unsplash.com/photo-1601887389937-0b02c26b6c3c?q=80&w=600",
          sources: [{ name: "Disney+", web_url: "https://www.disneyplus.com/" }]
        },
        "perks of being": {
          title: "The Perks of Being a Wallflower",
          poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600",
          sources: [{ name: "Amazon Prime", web_url: "https://www.amazon.com/" }]
        },
        "spirited away": {
          title: "Spirited Away",
          poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600",
          sources: [{ name: "Netflix", web_url: "https://www.netflix.com/" }]
        },
        "totoro": {
          title: "My Neighbor Totoro",
          poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600",
          sources: [{ name: "Netflix", web_url: "https://www.netflix.com/" }]
        },
        "amelie": {
          title: "Amélie",
          poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600",
          sources: [{ name: "Amazon Prime", web_url: "https://www.amazon.com/" }]
        },
        "mad max": {
          title: "Mad Max: Fury Road",
          poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600",
          sources: [{ name: "Amazon Prime", web_url: "https://www.amazon.com/" }]
        },
        "baby driver": {
          title: "Baby Driver",
          poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600",
          sources: [{ name: "Netflix", web_url: "https://www.netflix.com/" }]
        },
        "speed": {
          title: "Speed",
          poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600",
          sources: [{ name: "Amazon Prime", web_url: "https://www.amazon.com/" }]
        },
        "before sunrise": {
          title: "Before Sunrise",
          poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600",
          sources: [{ name: "Apple TV", web_url: "https://tv.apple.com/" }]
        },
        "la la land": {
          title: "La La Land",
          poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600",
          sources: [{ name: "Netflix", web_url: "https://www.netflix.com/" }]
        },
        "about time": {
          title: "About Time",
          poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600",
          sources: [{ name: "Netflix", web_url: "https://www.netflix.com/" }]
        }
      };

      const matchedKey = Object.keys(mockMovies).find(k => movieName.toLowerCase().includes(k));
      const fallbackMovie = mockMovies[matchedKey] || mockMovies["grand budapest"];
      
      setMovieDetails({
        title: fallbackMovie.title,
        poster: fallbackMovie.poster,
        sources: fallbackMovie.sources
      });
      return;
    }

    try {
      const searchRes = await fetch(
        `https://api.watchmode.com/v1/search/?apiKey=${key}&search_field=name&search_value=${encodeURIComponent(movieName)}&types=movie`
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
