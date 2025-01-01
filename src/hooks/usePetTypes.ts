import { useQuery } from "@tanstack/react-query";
import { PetType } from '../types/types';
import { apiRequest } from "../utils/api";

const fetchPetTypes = async () => {
  return apiRequest<PetType[]>('pet-types', 'GET') || [];
};

export const usePetTypes = () => {
  return useQuery({
    queryKey:["petTypes"], 
    queryFn: fetchPetTypes,
    staleTime: 36000000
  });
};
