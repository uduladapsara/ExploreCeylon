import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
	const { register } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const payload = Object.fromEntries(formData.entries());

		try {
			await register(payload);
			navigate("/");
		} catch (err) {
			setError("Unable to create account. Please retry.");
		}
	};

	return (
		<section className="section-pad">
			<div className="mx-auto max-w-4xl grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
				<div>
					<p className="text-sm uppercase tracking-[0.3em] text-sky">Join ExploreCeylon</p>
					<h1 className="mt-2 font-display text-4xl text-ink">Create your luxury profile</h1>
					<p className="mt-4 text-sm text-ink/70">
						Unlock tailored tours, travel updates, and concierge service.
					</p>
				</div>
				<form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6">
					<div className="grid gap-4">
						<input
							name="name"
							className="rounded-xl border border-white/60 bg-white/70 px-4 py-3"
							placeholder="Full name"
							required
						/>
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
							Create account
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Register;
