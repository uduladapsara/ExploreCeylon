import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { navLinks } from "../../routes.jsx";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-40">
			<nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
				<div className="glass-card flex w-full items-center justify-between rounded-2xl px-5 py-3">
					<NavLink to="/" className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 p-1 shadow-glow">
							<img src={logo} alt="ExploreCeylon" className="h-full w-full rounded-full object-cover" />
						</div>
						<div>
							<p className="font-display text-lg">ExploreCeylon</p>
							<p className="text-xs uppercase tracking-[0.3em] text-sky">Sri Lanka</p>
						</div>
					</NavLink>
					<div className="hidden items-center gap-8 lg:flex">
						{navLinks.map((link) => (
							<NavLink
								key={link.name}
								to={link.path}
								className={({ isActive }) =>
									`text-sm font-medium uppercase tracking-[0.2em] transition ${
										isActive ? "text-ocean" : "text-ink/70 hover:text-ocean"
									}`
								}
							>
								{link.name}
							</NavLink>
						))}
						<NavLink
							to="/tours"
							className="rounded-full bg-ocean px-6 py-2 text-sm font-semibold text-white shadow-glow"
						>
							Luxury Tours
						</NavLink>
					</div>
					<button
						className="lg:hidden"
						onClick={() => setOpen((prev) => !prev)}
						aria-label="Toggle navigation"
					>
						{open ? <FaTimes /> : <FaBars />}
					</button>
				</div>
			</nav>
			{open && (
				<div className="lg:hidden">
					<div className="glass-card mx-6 rounded-2xl p-6">
						<div className="flex flex-col gap-4">
							{navLinks.map((link) => (
								<NavLink
									key={link.name}
									to={link.path}
									onClick={() => setOpen(false)}
									className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/70"
								>
									{link.name}
								</NavLink>
							))}
							<NavLink
								to="/tours"
								onClick={() => setOpen(false)}
								className="rounded-full bg-ocean px-6 py-2 text-center text-sm font-semibold text-white"
							>
								Luxury Tours
							</NavLink>
						</div>
					</div>
				</div>
			)}
		</header>
	);
};

export default Navbar;
