import { useEffect, useMemo, useState } from "react";
import { FaPaperPlane, FaTimes, FaComments } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import { getChatMessages, sendChatMessage } from "../../services/chatService";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const socketUrl = useMemo(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    return apiUrl.replace(/\/api$/, "");
  }, []);

  useEffect(() => {
    const socket = io(socketUrl, { transports: ["websocket"] });
    socket.on("chat:message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => socket.disconnect();
  }, [socketUrl]);

  useEffect(() => {
    if (!open) return;
    getChatMessages().then(setMessages).catch(() => null);
  }, [open]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const payload = { message: input.trim() };
    setInput("");
    setMessages((prev) => [
      ...prev,
      { message: payload.message, source: "web", _id: Date.now() }
    ]);
    try {
      const result = await sendChatMessage(payload);
      if (result?.bot) {
        setMessages((prev) => [...prev, result.bot]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { message: "Message failed to send.", source: "system", _id: Date.now() + 1 }
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass-card w-80 rounded-2xl p-4 text-ink"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-sky">Concierge</p>
                <h3 className="font-display text-lg">ExploreCeylon Chat</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full bg-white/50 p-2 hover:bg-white"
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>
            <div className="mt-4 h-48 space-y-3 overflow-y-auto rounded-xl bg-white/40 p-3 text-sm">
              {messages.length === 0 ? (
                <div className="w-fit rounded-lg bg-sky/20 px-3 py-2">
                  Hello! Ready to plan your Sri Lanka escape?
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message._id || message.createdAt}
                    className={`w-fit rounded-lg px-3 py-2 ${
                      message.source === "web" || message.source === "socket"
                        ? "ml-auto bg-ocean text-white"
                        : "bg-sky/20"
                    }`}
                  >
                    {message.message}
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <input
                className="flex-1 rounded-full border border-white/50 bg-white/70 px-4 py-2 text-sm focus:outline-none"
                placeholder="Type your message..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button
                className="rounded-full bg-ocean p-3 text-white shadow-glow"
                onClick={handleSend}
                type="button"
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="mt-3 flex h-14 w-14 items-center justify-center rounded-full bg-ocean text-white shadow-glow"
        aria-label="Toggle chat"
      >
        <FaComments />
      </button>
    </div>
  );
};

export default ChatWidget;
