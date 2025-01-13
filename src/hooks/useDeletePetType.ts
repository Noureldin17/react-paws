import { useMutation, useQueryClient } from "@tanstack/react-query";

const deletePetType = async (petTypeId: number) => {
    const response = await fetch(`http://localhost:8080/api/v1/pet-types/${petTypeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete the listing.");
    }
  }

export const useDeletePetType = () => {
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationFn: deletePetType,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["petTypes"] });
      },
    }
  );
};
