import { useInfiniteQuery } from '@tanstack/react-query';
import { apiRequest } from '../utils/api';
import { QUERY_KEYS } from '../utils/queryKeys';
import {ProductFilters, ApiResponse, Product } from '../types/types';

const fetchProducts = async ({ pageParam = 1, filters }: { pageParam?: unknown, filters: ProductFilters }) => {
    return apiRequest<ApiResponse<Product[]>>('products/filter', 'GET', { page: pageParam, ...filters });
};

export const useProducts = (filters: ProductFilters) => {
    return useInfiniteQuery<ApiResponse<Product[]>, Error>({
      queryKey: [QUERY_KEYS.PRODUCTS, filters],
      queryFn: ({ pageParam = 1 }) => fetchProducts({ pageParam, filters }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage?.last == false ? lastPage?.number + 1 : undefined,
    });
  };