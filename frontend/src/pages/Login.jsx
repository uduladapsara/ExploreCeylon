import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const payload = Object.fromEntries(formData.entries());

		try {
			await login(payload);
			navigate("/");
		} catch (err) {
			setError("Invalid credentials. Please try again.");
		}
	};

	return (
		<section className="section-pad">
			<div className="mx-auto max-w-4xl grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
				<div>
					<p className="text-sm uppercase tracking-[0.3em] text-sky">Welcome back</p>
					<h1 className="mt-2 font-display text-4xl text-ink">Login to your concierge</h1>
					<p className="mt-4 text-sm text-ink/70">
						Access saved itineraries and manage your bookings.
					</p>
				</div>
				<form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6">
					<div className="grid gap-4">
						<input
							name="email"
							type="email"
							className="rounded-xl border border-white/60 bg-white/70 px-4 py-3"
							placeholder="Email address"
							required
						/>
						<input
							name="password"
							type="password"
							className="rounded-xl border border-white/60 bg-white/70 px-4 py-3"
							placeholder="Password"
							required
						/>
						{error && <p className="text-sm text-red-600">{error}</p>}
						<button className="rounded-full bg-ocean px-6 py-3 text-sm font-semibold text-white">
							Sign in
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Login;
