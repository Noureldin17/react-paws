import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../utils/api";
// import { AuthenticationError } from "../utils/errors";

const approveRequest = async (requestId: number) => {
  // try {
    return await apiRequest<void>("adoption-request/approve", "POST", {requestId}, undefined);
  // } catch (error) {
  //   if (error instanceof AuthenticationError) {
  //     throw error;
  //   }
  //   throw new Error("An unexpected error occurred");
  // }
};

export const useApproveRequest = () => {
  return useMutation<void, Error,number>({
    mutationFn: approveRequest,
  });
};
