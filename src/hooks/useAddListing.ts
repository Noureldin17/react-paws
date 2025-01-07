import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../utils/api";

const addListing = (formData: FormData) =>
  apiRequest("adoption/create", "POST", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const useAddListing = () => useMutation(
    {
        mutationFn: addListing
    }
);
