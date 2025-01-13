import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateProduct = async (data:{formData: FormData, productId: number}) => {
    const response = await fetch(`http://localhost:8080/api/v1/products/${data.productId}`, {
      method: "PUT",
      body: data.formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add product.");
    }

    return response.json();
  };

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationFn:updateProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["products"]});
      },
    }
  );
};
