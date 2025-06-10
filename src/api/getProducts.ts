import axios from "axios";
import { BASE_URL } from "./constants";

export const getProducts = async (page = 1, pageSize = 6) => {
  const response = await axios.get(
    `${BASE_URL}/products?page=${page}&page_size=${pageSize}`
  );
  return response.data;
};
