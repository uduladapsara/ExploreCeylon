const BookingForm = ({ onSubmit, loading }) => {
	return (
		<form onSubmit={onSubmit} className="glass-card rounded-3xl p-6">
			<div className="grid gap-4">
				<input
					name="date"
					type="date"
					className="rounded-xl border border-white/60 bg-white/70 px-4 py-3"
					required
				/>
				<input
					name="guests"
					type="number"
					min="1"
					placeholder="Number of guests"
					className="rounded-xl border border-white/60 bg-white/70 px-4 py-3"
					required
				/>
				<textarea
					name="notes"
					rows="4"
					placeholder="Special requests"
					className="rounded-xl border border-white/60 bg-white/70 px-4 py-3"
				/>
				<button
					type="submit"
					className="rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white shadow-glow"
					disabled={loading}
				>
					{loading ? "Booking..." : "Confirm booking"}
				</button>
			</div>
		</form>
	);
};

export default BookingForm;
