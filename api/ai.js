export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { mood } = req.body;

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
