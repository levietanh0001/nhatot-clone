// export function useGetFavoriteProductCount(options={}) {
//   return useQuery({
//     queryKey: ['getFavoriteProductCount'],
//     queryFn: ({ signal }) => {
//       const params = new URLSearchParams({
//         userId: (options as any)?.userId
//       });
//       return axiosPublic.get('favorite-list/products/count', { params, signal });
//     },
//     keepPreviousData: true,
//     refetchOnMount: true, // if component is mounted, refetch
//     refetchOnWindowFocus: false,
//     staleTime: 0,
//     select: (data) => {
//       return data.data;
//     }
//   })
// }