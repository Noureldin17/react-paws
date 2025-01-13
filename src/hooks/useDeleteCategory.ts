import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteCategory = async (categoryId: number) => {
    const response = await fetch(`http://localhost:8080/api/v1/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete the listing.");
    }
  }

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationFn: deleteCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
    }
  );
};
