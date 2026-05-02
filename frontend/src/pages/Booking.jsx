import { useState } from "react";
import BookingForm from "../components/booking/BookingForm.jsx";
import { createBooking } from "../services/bookingService";

const Booking = () => {
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setSuccess(false);
		const formData = new FormData(event.target);
		const payload = Object.fromEntries(formData.entries());

		try {
			await createBooking(payload);
			setSuccess(true);
			event.target.reset();
		} catch (error) {
			setSuccess(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="section-pad">
			<div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
				<div>
					<p className="text-sm uppercase tracking-[0.3em] text-sky">Booking</p>
					<h1 className="mt-2 font-display text-4xl text-ink">Reserve your private journey</h1>
					<p className="mt-4 text-sm text-ink/70">
						Select your preferred date and share your travel preferences.
					</p>
					{success && (
						<div className="mt-6 rounded-2xl bg-nature/10 px-4 py-3 text-sm text-nature">
							Booking confirmed. Our concierge will contact you shortly.
						</div>
					)}
				</div>
				<BookingForm onSubmit={handleSubmit} loading={loading} />
			</div>
		</section>
	);
};

export default Booking;
