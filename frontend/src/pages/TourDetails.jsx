import { useEffect, useMemo, useState } from "react";
import { FaCalendarAlt, FaMapMarkedAlt, FaStar } from "react-icons/fa";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import jsPDF from "jspdf";
import tourHeroImage from "../assets/images/weli5.jpg";
import tourGalleryOne from "../assets/images/Ella3.jpg";
import tourGalleryTwo from "../assets/images/sigiriya5.jpg";
import { useParams } from "react-router-dom";
import { getTourById } from "../services/tourService";
import { getReviews } from "../services/reviewService";

const galleryFallback = [tourHeroImage, tourGalleryOne, tourGalleryTwo];

const TourDetails = () => {
	const { id } = useParams();
	const [tour, setTour] = useState(null);
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
	});

	const center = useMemo(() => ({ lat: 7.8731, lng: 80.7718 }), []);

	useEffect(() => {
		const loadTour = async () => {
			try {
				const data = await getTourById(id);
				setTour(data);
				const reviewData = await getReviews(id);
				setReviews(reviewData);
			} catch (err) {
				setError("Unable to load tour details.");
			} finally {
				setLoading(false);
			}
		};
		loadTour();
	}, [id]);

	const downloadPdf = () => {
		const doc = new jsPDF();
		doc.setFont("helvetica", "bold");
		doc.text("ExploreCeylon - Luxury Itinerary", 20, 20);
		doc.setFont("helvetica", "normal");
		doc.text("Day 1: Arrival + Colombo skyline", 20, 40);
		doc.text("Day 2: Sigiriya rock fortress", 20, 55);
		doc.text("Day 3: Ella tea trails", 20, 70);
		doc.text("Day 4: Mirissa coast + whale watching", 20, 85);
		doc.save("exploreceylon-itinerary.pdf");
	};

	if (loading) {
		return (
			<section className="section-pad">
				<p className="text-sm text-ink/60">Loading tour details...</p>
			</section>
		);
	}

	if (error || !tour) {
		return (
			<section className="section-pad">
				<p className="text-sm text-red-600">{error || "Tour not found."}</p>
			</section>
		);
	}

	const gallery = tour.images?.length ? tour.images : galleryFallback;

	return (
		<section className="section-pad">
			<div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
				<div className="space-y-6">
					<div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
						<img src={gallery[0]} alt="Tour" className="h-72 w-full rounded-3xl object-cover" />
						<div className="grid gap-4">
							<img src={gallery[1]} alt="Tour" className="h-32 w-full rounded-3xl object-cover" />
							<img src={gallery[2]} alt="Tour" className="h-32 w-full rounded-3xl object-cover" />
						</div>
					</div>
					<div className="glass-card rounded-3xl p-6">
						<p className="text-sm uppercase tracking-[0.3em] text-sky">Signature Experience</p>
						<h1 className="mt-2 font-display text-4xl text-ink">{tour.title}</h1>
						<div className="mt-4 flex items-center gap-2 text-sun">
							{[1, 2, 3, 4, 5].map((star) => (
								<FaStar key={star} />
							))}
							<span className="text-xs text-ink/60">{reviews.length} reviews</span>
						</div>
						<p className="mt-4 text-sm text-ink/70">
							{tour.description ||
								"A curated itinerary across Sri Lanka with luxury stays, private guides, and immersive experiences."}
						</p>
						<div className="mt-6 flex flex-wrap gap-4 text-sm text-ink/70">
							<span className="flex items-center gap-2">
								<FaCalendarAlt className="text-sky" /> Available weekly
							</span>
							<span className="flex items-center gap-2">
								<FaMapMarkedAlt className="text-sky" /> {tour.location || "Sri Lanka"}
							</span>
						</div>
						<div className="mt-6 flex gap-4">
							<button
								onClick={downloadPdf}
								className="rounded-full bg-sun px-6 py-2 text-sm font-semibold text-ink"
							>
								Download itinerary
							</button>
							<button className="rounded-full bg-ocean px-6 py-2 text-sm font-semibold text-white">
								Book this tour
							</button>
						</div>
					</div>
				</div>
				<div className="space-y-6">
					<div className="glass-card rounded-3xl p-6">
						<p className="text-sm uppercase tracking-[0.3em] text-sky">Map</p>
						<div className="mt-4 h-64 overflow-hidden rounded-2xl">
							{isLoaded ? (
								<GoogleMap
									center={center}
									zoom={7}
									mapContainerStyle={{ width: "100%", height: "100%" }}
								/>
							) : (
								<div className="flex h-full items-center justify-center bg-white/60 text-sm text-ink/60">
									Add your Google Maps API key
								</div>
							)}
						</div>
					</div>
					<div className="glass-card rounded-3xl p-6">
						<p className="text-sm uppercase tracking-[0.3em] text-sky">Reviews</p>
						<div className="mt-4 space-y-4">
							{reviews.map((review) => (
								<div key={review.name} className="rounded-2xl bg-white/60 p-4">
									<p className="text-sm text-ink/80">{review.text}</p>
									<p className="mt-2 text-xs uppercase tracking-[0.3em] text-ink/60">
										{review.name}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TourDetails;
