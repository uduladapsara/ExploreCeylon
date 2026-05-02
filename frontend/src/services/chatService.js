import api from "./api";

export const getChatMessages = async () => {
  const { data } = await api.get("/chat/messages");
  return data;
};

export const sendChatMessage = async (payload) => {
  const { data } = await api.post("/chat/messages", payload);
  return data;
};
