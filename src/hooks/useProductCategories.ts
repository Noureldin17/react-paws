import { useQuery } from "@tanstack/react-query";
import { Category } from "../types/types";
import { apiRequest } from "../utils/api";

const fetchCategories = async () => {
  return apiRequest<Category[]>('categories', 'GET') || [];
};

export const useProductCategories = () => {
  return useQuery<Category[]>(  
    {
        queryKey: ["categories"], 
        queryFn: fetchCategories,
        staleTime: 36000000
    }
  );
};
