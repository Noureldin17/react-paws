import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../utils/api";
import { AuthenticationError } from "../utils/errors";

const placeOrder = async (orderDetails: { productId: number; quantity: number }[]) => {
  try {
    return await apiRequest<void>("orders", "POST", undefined, orderDetails);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const usePlaceOrder = () => {
  return useMutation<void, Error, { productId: number; quantity: number }[]>({
    mutationFn: placeOrder,
  });
};
