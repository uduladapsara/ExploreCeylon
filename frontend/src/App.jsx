import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";
import ChatWidget from "./components/common/ChatWidget.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Tours from "./pages/Tours.jsx";
import TourDetails from "./pages/TourDetails.jsx";
import Booking from "./pages/Booking.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Contact from "./pages/Contact.jsx";

const pageVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

const App = () => {
	const location = useLocation();

	return (
		<div className="min-h-screen bg-sand text-ink">
			<Navbar />
			<AnimatePresence mode="wait">
				<Routes location={location} key={location.pathname}>
					<Route
						path="/"
						element={
							<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
								<Home />
							</motion.div>
						}
					/>
					<Route
						path="/tours"
						element={
							<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
								<Tours />
							</motion.div>
						}
					/>
					<Route
						path="/tours/:id"
						element={
							<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
								<TourDetails />
							</motion.div>
						}
					/>
					<Route
						path="/booking"
						element={
							<ProtectedRoute>
								<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
									<Booking />
								</motion.div>
							</ProtectedRoute>
						}
					/>
					<Route
						path="/login"
						element={
							<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
								<Login />
							</motion.div>
						}
					/>
					<Route
						path="/register"
						element={
							<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
								<Register />
							</motion.div>
						}
					/>
					<Route
						path="/contact"
						element={
							<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
								<Contact />
							</motion.div>
						}
					/>
					<Route
						path="/admin"
						element={
							<ProtectedRoute>
								<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
									<AdminDashboard />
								</motion.div>
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AnimatePresence>
			<Footer />
			<ChatWidget />
		</div>
	);
};

export default App;
