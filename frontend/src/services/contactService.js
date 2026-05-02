import api from "./api";

export const sendInquiry = async (payload) => {
  const { data } = await api.post("/contact", payload);
  return data;
};
