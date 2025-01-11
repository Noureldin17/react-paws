import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteListing = async (listingId: number) => {
    const response = await fetch(`http://localhost:8080/api/v1/adoption?id=${listingId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete the listing.");
    }
  }

export const useDeleteListing = () => {
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationFn: deleteListing,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      },
    }
  );
};
