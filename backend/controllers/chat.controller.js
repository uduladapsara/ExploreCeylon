import ChatMessage from "../models/ChatMessage.js";

const getBotReply = (text) => {
  const message = text.toLowerCase();
  if (message.includes("price") || message.includes("cost")) {
    return "Our luxury packages start from $390. Share your dates for a tailored quote.";
  }
  if (message.includes("beach") || message.includes("coast")) {
    return "Mirissa and Bentota are guest favorites. Do you prefer a quiet or vibrant beach?";
  }
  if (message.includes("mountain") || message.includes("ella") || message.includes("tea")) {
    return "Ella and Nuwara Eliya deliver misty tea-country escapes. Want a 2-night or 3-night stay?";
  }
  if (message.includes("safari") || message.includes("yala")) {
    return "We can arrange a private Yala safari with a naturalist guide. Interested in sunrise or sunset?";
  }
  return "Wonderful choice. Tell us your travel dates and the experiences you love most.";
};

const getGeminiReply = async (text) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const prompt =
    "You are ExploreCeylon concierge. Reply in 1-2 sentences, warm and helpful, about Sri Lanka travel. " +
    "If asked for distance/time, say it depends on route and offer to plan. Question: " +
    text;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 120 }
        }),
        signal: controller.signal
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("Gemini error:", response.status, errorText.slice(0, 200));
      return null;
    }

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.warn("Gemini request failed:", error?.message || error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await ChatMessage.find().sort({ createdAt: -1 }).limit(50);
    return res.json(messages.reverse());
  } catch (error) {
    return next(error);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const created = await ChatMessage.create({ name, email, message, source: "web" });
    const io = req.app.get("io");

    if (io) {
      io.emit("chat:message", created);
    }

    const aiReply = await getGeminiReply(message);
    const botMessage = await ChatMessage.create({
      message: aiReply || getBotReply(message),
      source: "bot"
    });

    if (io) {
      io.emit("chat:message", botMessage);
    }

    return res.status(201).json({ user: created, bot: botMessage });
  } catch (error) {
    return next(error);
  }
};
