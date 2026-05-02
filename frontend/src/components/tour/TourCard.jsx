import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
	const tourId = tour._id || tour.id;
	const image = tour.image || tour.images?.[0] || "";
	const rating = tour.rating || 5;
	const reviews = tour.reviews || 0;
	return (
		<div className="glass-card overflow-hidden rounded-3xl">
			<img src={image} alt={tour.title} className="h-48 w-full object-cover" />
			<div className="p-5">
				<div className="flex items-center justify-between">
					<p className="text-xs uppercase tracking-[0.3em] text-sky">{tour.location}</p>
					<span className="rounded-full bg-sun px-3 py-1 text-xs font-semibold text-ink">
						${tour.price}
					</span>
				</div>
				<h3 className="mt-3 font-display text-xl text-ink">{tour.title}</h3>
				<div className="mt-3 flex items-center gap-2 text-sun">
					{[1, 2, 3, 4, 5].map((star) => (
						<FaStar key={star} className={star <= rating ? "" : "text-sun/30"} />
					))}
					<span className="text-xs text-ink/60">{reviews} reviews</span>
				</div>
				<Link
					to={`/tours/${tourId}`}
					className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-ocean px-4 py-2 text-sm font-semibold text-white"
				>
					Book Now
				</Link>
			</div>
		</div>
	);
};

export default TourCard;
