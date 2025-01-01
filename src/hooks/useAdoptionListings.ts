import { useInfiniteQuery } from '@tanstack/react-query';
import { apiRequest } from '../utils/api';
import { QUERY_KEYS } from '../utils/queryKeys';
import { ApiResponse, AdoptionListing } from '../types/types';

const fetchAdoptionListings = async ({
  pageParam = 0,
  filters,
}: {
  pageParam?: unknown;
  filters: Record<string, unknown>;
}) => {
  return apiRequest<ApiResponse<AdoptionListing[]>>('adoption', 'GET', {
    page: pageParam,
    ...filters,
  });
};

export const useAdoptionListings = (filters: Record<string, unknown>) => {
  return useInfiniteQuery<ApiResponse<AdoptionListing[]>, Error>({
    queryKey: [QUERY_KEYS.ADOPTION_LISTINGS, filters],
    queryFn: ({ pageParam = 0 }) => fetchAdoptionListings({ pageParam, filters }),
    getNextPageParam: (lastPage) =>
      lastPage.last === false ? lastPage.number + 1 : undefined,
    initialPageParam: 0,
  });
};
