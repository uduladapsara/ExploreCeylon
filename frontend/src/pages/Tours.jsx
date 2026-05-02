import { useEffect, useMemo, useState } from "react";
import TourList from "../components/tour/TourList.jsx";
import { getTours } from "../services/tourService";
import mirissaImage from "../assets/images/weli3.jpg";
import sigiriyaImage from "../assets/images/Sigiriya4.png";
import ellaImage from "../assets/images/Ella2.jpg";
import yalaImage from "../assets/images/gan4.jpg";
import kandyImage from "../assets/images/kandy4.jpg";
import bentotaImage from "../assets/images/weli6.jpg";

const imageFallbacks = {
	mirissa: mirissaImage,
	sigiriya: sigiriyaImage,
	ella: ellaImage,
	yala: yalaImage,
	kandy: kandyImage,
	bentota: bentotaImage,
};

const Tours = () => {
	const [query, setQuery] = useState("");
	const [price, setPrice] = useState("700");
	const [tours, setTours] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const loadTours = async () => {
			try {
				const data = await getTours();
				const normalized = data.map((tour) => ({
					...tour,
					image: tour.images?.[0] || imageFallbacks[tour.location?.toLowerCase()],
				}));
				setTours(normalized);
			} catch (err) {
				setError("Unable to load tours right now.");
			} finally {
				setLoading(false);
			}
		};
		loadTours();
	}, []);

	const filteredTours = useMemo(() => {
		return tours.filter((tour) => {
			const matchesQuery = tour.location.toLowerCase().includes(query.toLowerCase());
			const matchesPrice = tour.price <= Number(price);
			return matchesQuery && matchesPrice;
		});
	}, [query, price, tours]);

	return (
		<section className="section-pad">
			<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<p className="text-sm uppercase tracking-[0.3em] text-sky">Luxury Tours</p>
					<h1 className="font-display text-4xl text-ink">Discover Sri Lanka in style</h1>
					<p className="mt-3 text-sm text-ink/70">
						Handcrafted experiences from serene beaches to lush highlands.
					</p>
				</div>
				<div className="glass-card flex flex-col gap-4 rounded-3xl p-5 sm:flex-row">
					<input
						className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm"
						placeholder="Search location"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
					/>
					<div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink/60">
						Max price: ${price}
						<input
							type="range"
							min="200"
							max="700"
							value={price}
							onChange={(event) => setPrice(event.target.value)}
						/>
					</div>
				</div>
			</div>
			<div className="mt-12">
				{loading && <p className="text-sm text-ink/60">Loading tours...</p>}
				{error && <p className="text-sm text-red-600">{error}</p>}
				{!loading && !error && filteredTours.length === 0 && (
					<p className="text-sm text-ink/60">No tours found. Try another location.</p>
				)}
				{!loading && !error && filteredTours.length > 0 && (
					<TourList tours={filteredTours} />
				)}
			</div>
		</section>
	);
};

export default Tours;
