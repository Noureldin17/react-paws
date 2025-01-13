import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteProduct = async (productId: number) => {
    const response = await fetch(`http://localhost:8080/api/v1/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete the listing.");
    }
  }

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationFn: deleteProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
    }
  );
};
