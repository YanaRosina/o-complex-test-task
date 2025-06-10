import axios from "axios";
import { BASE_URL } from "./constants";

interface CartItem {
  id: number;
  quantity: number;
}

interface OrderData {
  phone: string;
  cart: CartItem[];
}

interface OrderResponse {
  success: number;
}

export const createOrder = async (
  orderData: OrderData
): Promise<OrderResponse> => {
  try {
    const response = await axios.post<OrderResponse>(
      `${BASE_URL}/order`,
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Ошибка при создании заказа"
      );
    }
    throw new Error("Неизвестная ошибка");
  }
};
