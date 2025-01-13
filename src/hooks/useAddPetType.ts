import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../utils/api";

const addPetType = (petType: string) =>
  apiRequest("pet-types", "POST",{}, {name:petType});

export const useAddPetType = () => {
    const queryClient = useQueryClient();
   return useMutation(
    {
        mutationFn: addPetType,
        onSuccess: () => queryClient.invalidateQueries({queryKey:["petTypes"]})
    }
)};
