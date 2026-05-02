import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { sendInquiry } from "../services/contactService";

const Contact = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      await sendInquiry(payload);
      setStatus({ type: "success", message: "Inquiry sent. Our team will reach out shortly." });
      event.target.reset();
    } catch (error) {
      setStatus({ type: "error", message: "Unable to send. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-pad">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm uppercase tracking-[0.3em] text-sky">Contact</p>
          <h1 className="font-display text-4xl text-ink">Plan Your Sri Lanka Journey</h1>
          <p className="mt-4 text-base text-ink/70">
            Share your travel dreams and our concierge team will curate a bespoke itinerary.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-sky" />
              contact@exploreceylon.com
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-sky" />
              +94 77 123 4567
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-sky" />
              Galle Face, Colombo 03, Sri Lanka
            </div>
          </div>
        </motion.div>
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-6"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4">
            <input
              name="name"
              className="rounded-xl border border-white/60 bg-white/70 px-4 py-3"
              placeholder="Full name"
              required
            />
            <input
              type="email"
              name="email"
              className="rounded-xl border border-white/60 bg-white/70 px-4 py-3"
              placeholder="Email address"
              required
            />
            <input
              name="phone"
              className="rounded-xl border border-white/60 bg-white/70 px-4 py-3"
              placeholder="Phone number"
            />
            <textarea
              name="message"
              rows="5"
              className="rounded-xl border border-white/60 bg-white/70 px-4 py-3"
              placeholder="Tell us about your trip"
              required
            />
            {status && (
              <p
                className={`text-sm ${
                  status.type === "success" ? "text-nature" : "text-red-600"
                }`}
              >
                {status.message}
              </p>
            )}
            <button
              type="submit"
              className="rounded-full bg-ocean px-6 py-3 text-white shadow-glow"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send inquiry"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
