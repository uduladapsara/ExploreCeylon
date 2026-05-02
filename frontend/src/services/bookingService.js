import api from "./api";

export const createBooking = async (payload) => {
	const { data } = await api.post("/bookings", payload);
	return data;
};
