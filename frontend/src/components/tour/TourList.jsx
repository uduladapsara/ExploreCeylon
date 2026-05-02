import TourCard from "./TourCard.jsx";

const TourList = ({ tours }) => {
	return (
		<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
			{tours.map((tour) => (
				<TourCard key={tour.id} tour={tour} />
			))}
		</div>
	);
};

export default TourList;
