export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { mood } = req.body;
    const cleanMood = (mood || "happy").toLowerCase();

    // 🔹 Fallback Mock Data Database for Local Testing / Offline usage
    const mockDatabase = {
      happy: [
        {
          food: "Creamy Tomato Basil Pasta",
          music: "Pharrell Williams - Happy (Uplifting Pop)",
          movie: "The Grand Budapest Hotel (2014)"
        },
        {
          food: "Loaded Chocolate Chip Cookies",
          music: "Uptown Funk - Mark Ronson ft. Bruno Mars (Funk Pop)",
          movie: "Paddington 2 (2017)"
        },
        {
          food: "Spiced Apple Crisp with Vanilla Ice Cream",
          music: "Walking on Sunshine - Katrina and the Waves (Classic Rock)",
          movie: "School of Rock (2003)"
        }
      ],
      sad: [
        {
          food: "Warm Classic Chicken Noodle Soup",
          music: "Skinny Love - Bon Iver (Acoustic Folk)",
          movie: "Eternal Sunshine of the Spotless Mind (2004)"
        },
        {
          food: "Decadent Double Chocolate Brownie",
          music: "Someone Like You - Adele (Piano Ballad)",
          movie: "Inside Out (2015)"
        },
        {
          food: "Macaroni and Cheese Comfort Bowl",
          music: "Holocene - Bon Iver (Ambient Folk)",
          movie: "The Perks of Being a Wallflower (2012)"
        }
      ],
      calm: [
        {
          food: "Steamed Jasmine Rice with Salmon",
          music: "Weightless - Marconi Union (Ambient)",
          movie: "Spirited Away (2001)"
        },
        {
          food: "Warm Honey Chamomile Oatmeal",
          music: "Lofi Hip Hop Radio - Beats to Relax/Study to",
          movie: "My Neighbor Totoro (1988)"
        },
        {
          food: "Avocado Toast with Poached Egg",
          music: "Clair de Lune - Claude Debussy (Classical)",
          movie: "Amélie (2001)"
        }
      ],
      energetic: [
        {
          food: "Spicy Buffalo Chicken Wings",
          music: "Midnight City - M83 (Synthwave)",
          movie: "Mad Max: Fury Road (2015)"
        },
        {
          food: "Loaded Beef Nachos with Jalapeños",
          music: "Harder, Better, Faster, Stronger - Daft Punk (Electro)",
          movie: "Baby Driver (2017)"
        },
        {
          food: "Fiesta Grilled Chicken Burrito",
          music: "Kickstart My Heart - Mötley Crüe (Hard Rock)",
          movie: "Speed (1994)"
        }
      ],
      romantic: [
        {
          food: "Rich Chocolate Fondue with Strawberries",
          music: "Coming Home - Leon Bridges (Soul / R&B)",
          movie: "Before Sunrise (1995)"
        },
        {
          food: "Classic Italian Spaghetti Carbonara",
          music: "Let's Stay Together - Al Green (Classic Soul)",
          movie: "La La Land (2016)"
        },
        {
          food: "Filet Mignon with Red Wine Reduction",
          music: "At Last - Etta James (Jazz / Blues)",
          movie: "About Time (2013)"
        }
      ]
    };

    if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === "undefined" || process.env.OPENROUTER_API_KEY.includes("YOUR_")) {
      // Pick a random option from the mock database based on the mood
      const options = mockDatabase[cleanMood] || mockDatabase["happy"];
      const randomIndex = Math.floor(Math.random() * options.length);
      const selected = options[randomIndex];

      const simulatedContent = `Food:\n${selected.food}\n\nMusic:\n${selected.music}\n\nMovie:\n${selected.movie}`;
      
      // Mimic OpenRouter response structure
      return res.status(200).json({
        result: {
          choices: [
            {
              message: {
                content: simulatedContent
              }
            }
          ]
        }
      });
    }

    // 🔹 RANDOM SEED (forces variation every request)
    const randomSeed = Math.floor(Math.random() * 100000);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://mood-banadu.vercel.app",
          "X-Title": "Mood Banadu",
        },
        body: JSON.stringify({
          model: "openrouter/auto",
          max_tokens: 200,
          temperature: 0.9,
          top_p: 0.9,
          messages: [
            {
              role: "user",
              content: `Seed: ${randomSeed}

                User mood is "${mood}".

                Give:
                - 1 food suggestion
                - 1 music genre
                - 1 movie title

                Make the answer DIFFERENT every time.
                Avoid repeating previous answers.
                Be creative.

                Answer in exactly this format:
                Food:
                Music:
                Movie:`,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    return res.status(200).json({ result: data });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
