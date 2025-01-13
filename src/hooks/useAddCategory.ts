import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../utils/api";

const addCategory = (category: {name: string, description: string}) =>
  apiRequest("categories", "POST",{}, category);

export const useAddCategory = () => {
    const queryClient = useQueryClient();
    return useMutation(
    {
        mutationFn: addCategory,
        onSuccess: () => queryClient.invalidateQueries({queryKey:["categories"]})
    }
)};
