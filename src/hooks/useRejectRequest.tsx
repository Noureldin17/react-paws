import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../utils/api";
import { AuthenticationError } from "../utils/errors";

const rejectRequest = async (requestId: number) => {
  try {
    return await apiRequest<void>("adoption-request/reject", "POST", {requestId}, undefined);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const useRejectRequest = () => {
  return useMutation<void, Error,number>({
    mutationFn: rejectRequest,
  });
};
