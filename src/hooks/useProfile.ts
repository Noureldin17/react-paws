import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../utils/api";
import { UserProfile } from "../types/types";

const fetchProfileInfo = async () => {
  return apiRequest<UserProfile>('userprofile', 'GET');
};

export const useProfile = () => {
  return useQuery<UserProfile>({
    queryKey:["userProfile"], 
    queryFn: fetchProfileInfo,
    // staleTime: 36000000
  });
};
