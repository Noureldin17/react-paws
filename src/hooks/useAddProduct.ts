import { useMutation, useQueryClient } from "@tanstack/react-query";

const addProduct = async (formData: FormData) => {
    const response = await fetch("http://localhost:8080/api/v1/products", {
      method: "POST",
      body: formData,
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

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationFn:addProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["products"]});
      },
    }
  );
};
