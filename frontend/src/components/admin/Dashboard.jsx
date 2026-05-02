const Dashboard = () => {
	return (
		<div className="grid gap-6 lg:grid-cols-[260px_1fr]">
			<aside className="glass-card rounded-3xl p-5">
				<p className="text-xs uppercase tracking-[0.3em] text-sky">Admin</p>
				<nav className="mt-6 space-y-3 text-sm font-semibold text-ink/70">
					<div className="rounded-xl bg-white/60 px-4 py-3">Overview</div>
					<div className="rounded-xl bg-white/60 px-4 py-3">Tours</div>
					<div className="rounded-xl bg-white/60 px-4 py-3">Bookings</div>
					<div className="rounded-xl bg-white/60 px-4 py-3">Users</div>
					<div className="rounded-xl bg-white/60 px-4 py-3">Messages</div>
				</nav>
			</aside>
			<section className="space-y-6">
				<div className="grid gap-4 md:grid-cols-3">
					{[
						{ label: "Total Users", value: "1,245" },
						{ label: "Bookings", value: "348" },
						{ label: "Revenue", value: "$128k" },
					].map((card) => (
						<div key={card.label} className="glass-card rounded-3xl p-6">
							<p className="text-xs uppercase tracking-[0.3em] text-sky">{card.label}</p>
							<h3 className="mt-4 font-display text-3xl text-ink">{card.value}</h3>
						</div>
					))}
				</div>
				<div className="glass-card rounded-3xl p-6">
					<p className="text-xs uppercase tracking-[0.3em] text-sky">Recent Bookings</p>
					<div className="mt-4 space-y-3 text-sm">
						{["Ella Retreat", "Sigiriya Heritage", "Southern Coast"].map((item) => (
							<div key={item} className="flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3">
								<span>{item}</span>
								<span className="text-ink/60">Pending</span>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Dashboard;
