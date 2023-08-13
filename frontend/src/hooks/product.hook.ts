import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "~/utils/axios.util";

export function useGetProduct(productId, slug) {

  return useQuery({
    queryKey: ['products', productId, slug],
    queryFn: ({ signal }) => {
      
      const params = new URLSearchParams({ productId, slug });
      return axiosPublic.get(`/products/${productId}/${slug}`, { params, signal });
    },
    keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    // cacheTime: 5000, // by default 5 mins
    staleTime: 5000,
    select: (data) => {
      return data.data;
    },
    
  });
}
