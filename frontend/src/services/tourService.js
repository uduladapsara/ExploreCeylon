import api from "./api";

export const getTours = async () => {
	const { data } = await api.get("/tours");
	return data;
};

export const getTourById = async (id) => {
	const { data } = await api.get(`/tours/${id}`);
	return data;
};
