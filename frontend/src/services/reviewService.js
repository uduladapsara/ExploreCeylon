import api from "./api";

export const getReviews = async (tourId) => {
  const { data } = await api.get(`/reviews/${tourId}`);
  return data;
};
