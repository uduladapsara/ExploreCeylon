import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="mt-20 bg-ink text-sand">
			<div className="section-pad">
				<div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
					<div>
						<h3 className="font-display text-2xl">ExploreCeylon</h3>
						<p className="mt-3 text-sm text-sand/70">
							Curated luxury journeys across Sri Lanka's golden beaches, misty mountains,
							and UNESCO heritage wonders.
						</p>
						<div className="mt-6 flex items-center gap-4">
							{[FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn].map((Icon, idx) => (
								<button
									key={idx}
									className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
								>
									<Icon />
								</button>
							))}
						</div>
					</div>
					<div>
						<p className="text-sm uppercase tracking-[0.3em] text-sand/60">Explore</p>
						<ul className="mt-4 space-y-2 text-sm text-sand/70">
							<li>Luxury Tours</li>
							<li>Travel Stories</li>
							<li>Concierge Service</li>
							<li>Private Charters</li>
						</ul>
					</div>
					<div>
						<p className="text-sm uppercase tracking-[0.3em] text-sand/60">Newsletter</p>
						<p className="mt-4 text-sm text-sand/70">
							Receive seasonal offers, curated itineraries, and hidden gems.
						</p>
						<div className="mt-4 flex items-center gap-3 rounded-full bg-white/10 p-2">
							<input
								className="flex-1 bg-transparent px-4 text-sm text-sand placeholder:text-sand/50 focus:outline-none"
								placeholder="Email address"
							/>
							<button className="rounded-full bg-sun px-5 py-2 text-xs font-semibold text-ink">
								Subscribe
							</button>
						</div>
					</div>
				</div>
				<p className="mt-12 text-xs text-sand/50">
					2026 ExploreCeylon. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
