import axios from "axios";
import { BASE_URL } from "./constants";

export const getReviews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении отзывов:", error);
    throw new Error("Не удалось загрузить отзывы");
  }
};
