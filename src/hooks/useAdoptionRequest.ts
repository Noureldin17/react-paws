import { useMutation } from "@tanstack/react-query";

const adoptionRequest = async ({listingId}: {listingId: number}) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/adoption-request/create?listingId=${listingId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    }
  );
  return response;
};

export const useAdoptionRequest = () => {
  return useMutation({
    mutationFn: adoptionRequest,
    onError: (error: any) => {
      console.error("Failed to send adoption request:", error);
      throw error;
    },
  });
};
