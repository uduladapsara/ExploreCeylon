import Dashboard from "../components/admin/Dashboard.jsx";

const AdminDashboard = () => {
	return (
		<section className="section-pad">
			<div>
				<p className="text-sm uppercase tracking-[0.3em] text-sky">Admin Dashboard</p>
				<h1 className="mt-2 font-display text-4xl text-ink">Manage ExploreCeylon</h1>
			</div>
			<div className="mt-8">
				<Dashboard />
			</div>
		</section>
	);
};

export default AdminDashboard;
