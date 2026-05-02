import mailer from "../utils/mailer.js";

export const sendContactEmail = async (req, res, next) => {
  try {
    const { name, email, message, phone, subject } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    const toAddress = process.env.EMAIL_TO || process.env.SMTP_USER;

    await mailer.sendMail({
      from: process.env.EMAIL_FROM || `ExploreCeylon <${process.env.SMTP_USER}>`,
      to: toAddress,
      subject: subject || "New ExploreCeylon Inquiry",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\n${message}`
    });

    return res.json({ message: "Inquiry sent successfully" });
  } catch (error) {
    return next(error);
  }
};
