import { motion } from "framer-motion";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import heroPoster from "../assets/images/image.jpg";
import heroVideo from "../assets/videos/Sri Lanka  4K Cinematic Travel Film - Lalit Choudhary Films (1080p, h264).mp4";
import sigiriyaImage from "../assets/images/sigiriya.jpg";
import mirissaImage from "../assets/images/weli2.jpg";
import ellaImage from "../assets/images/Ella1.jpg";

const destinations = [
	{
		name: "Sigiriya Rock Fortress",
		image: sigiriyaImage,
		tag: "Heritage",
	},
	{
		name: "Mirissa Beach",
		image: mirissaImage,
		tag: "Coastal",
	},
	{
		name: "Ella Tea Hills",
		image: ellaImage,
		tag: "Highlands",
	},
];

const testimonials = [
	{
		name: "Isabella Grant",
		title: "Luxury Honeymoon",
		quote:
			"The concierge curated a flawless itinerary. From private villas to hidden waterfalls, every day felt bespoke.",
	},
	{
		name: "Arjun Mehta",
		title: "Family Escape",
		quote:
			"Our guide anticipated every detail. The kids loved the wildlife safaris and cultural nights.",
	},
];

const Home = () => {
	return (
		<div>
			<section className="relative h-[90vh] overflow-hidden">
				<video
					className="absolute inset-0 h-full w-full object-cover"
					autoPlay
					muted
					loop
					playsInline
					poster={heroPoster}
				>
					<source src={heroVideo} type="video/mp4" />
				</video>
				<div className="absolute inset-0 bg-hero opacity-55" />
				<div className="relative z-10 flex h-full items-center">
					<div className="section-pad w-full">
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-sm uppercase tracking-[0.5em] text-sand/70"
						>
							Luxury Sri Lanka Journeys
						</motion.p>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className="mt-4 max-w-3xl font-display text-4xl text-sand md:text-6xl"
						>
							Discover the soul of Sri Lanka with curated luxury escapes.
						</motion.h1>
						<motion.span
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="mt-4 inline-block animate-blink text-lg font-semibold text-sun"
						>
							Bespoke itineraries. Private guides. Heritage sanctuaries.
						</motion.span>
						<div className="mt-10 flex flex-wrap gap-4">
							<Link
								to="/tours"
								className="rounded-full bg-sun px-8 py-3 text-sm font-semibold text-ink shadow-glow"
							>
								Explore Tours
							</Link>
							<Link
								to="/booking"
								className="rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-sand"
							>
								Book Now
							</Link>
						</div>
					</div>
				</div>
			</section>

			<section className="section-pad">
				<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<p className="text-sm uppercase tracking-[0.3em] text-sky">Featured Destinations</p>
						<h2 className="font-display text-3xl text-ink">Iconic landscapes, curated experiences</h2>
					</div>
					<button className="flex items-center gap-2 text-sm font-semibold text-ocean">
						View all destinations <FaArrowRight />
					</button>
				</div>
				<div className="mt-10 grid gap-6 md:grid-cols-3">
					{destinations.map((destination) => (
						<motion.article
							key={destination.name}
							whileHover={{ y: -6 }}
							className="group relative overflow-hidden rounded-3xl shadow-soft"
						>
							<img
								src={destination.image}
								alt={destination.name}
								className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent" />
							<div className="absolute bottom-5 left-5">
								<p className="text-xs uppercase tracking-[0.3em] text-sun">{destination.tag}</p>
								<h3 className="mt-2 font-display text-xl text-white">{destination.name}</h3>
							</div>
						</motion.article>
					))}
				</div>
			</section>

			<section className="section-pad">
				<div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
					<div className="glass-card rounded-3xl p-8">
						<p className="text-sm uppercase tracking-[0.3em] text-sky">Why ExploreCeylon</p>
						<h2 className="mt-4 font-display text-3xl text-ink">Elevated travel design for modern explorers</h2>
						<p className="mt-4 text-sm text-ink/70">
							We blend five-star hospitality with authentic local encounters. Expect private transfers,
							heritage stays, and dedicated concierge support from arrival to departure.
						</p>
						<div className="mt-6 grid gap-4 md:grid-cols-2">
							{[
								"Handpicked luxury stays",
								"Private local experts",
								"Seamless transfers",
								"Personalized itineraries",
							].map((item) => (
								<div key={item} className="rounded-2xl bg-white/60 px-4 py-3 text-sm">
									{item}
								</div>
							))}
						</div>
					</div>
					<div className="space-y-6">
						<div className="glass-card rounded-3xl p-6">
							<p className="text-sm uppercase tracking-[0.3em] text-sky">Client stories</p>
							<div className="mt-4 space-y-6">
								{testimonials.map((testimonial) => (
									<div key={testimonial.name} className="rounded-2xl bg-white/60 p-4">
										<div className="flex items-center gap-2 text-sun">
											{[1, 2, 3, 4, 5].map((star) => (
												<FaStar key={star} />
											))}
										</div>
										<p className="mt-3 text-sm text-ink/70">{testimonial.quote}</p>
										<p className="mt-3 text-xs uppercase tracking-[0.3em] text-ink/60">
											{testimonial.name} - {testimonial.title}
										</p>
									</div>
								))}
							</div>
						</div>
						<div className="rounded-3xl bg-ocean p-6 text-white shadow-glow">
							<h3 className="font-display text-2xl">Ready to travel?</h3>
							<p className="mt-2 text-sm text-white/80">
								Speak with our luxury travel designers today.
							</p>
							<button className="mt-4 rounded-full bg-sun px-6 py-2 text-sm font-semibold text-ink">
								Schedule a call
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
