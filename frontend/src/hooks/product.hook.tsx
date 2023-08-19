import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate, axiosPublic } from '~/utils/axios.util';

export function useGetProductById(productId, slug) {
  return useQuery({
    queryKey: ['getProductsById', productId, slug],
    queryFn: ({ signal }) => {
      // const params = new URLSearchParams({ productId, slug });
      return axiosPublic.get(`/products/${productId}/${slug}`, {
        // params,
        signal,
      });
    },
    keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    // cacheTime: 10000, // by default 5 mins
    staleTime: 5000,
    select: (data) => {
      return data.data;
    },
  });
}

export function useGetProducts(criteria) {
  return useQuery({
    queryKey: ['getProducts', criteria],
    queryFn: ({ signal }) => {
      const params = new URLSearchParams(criteria);
      return axiosPublic.get(`/products`, { params, signal });
    },
    keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    // cacheTime: 10000, // by default 5 mins
    staleTime: 5000,
    select: (data) => {
      return data.data;
    },
  });
}

export function useGetProductCount() {
  return useQuery({
    queryKey: ['getProductCount'],
    queryFn: ({ signal }) => {

      return axiosPublic.get('/products/count', { signal });
    },
    keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    staleTime: 0,
    select: (data) => {
      return data.data;
    }
  })
}

export function useGetFavoriteProductCount() {
  return useQuery({
    queryKey: ['getFavoriteProductCount'],
    queryFn: ({ signal }) => {

      return axiosPrivate.get('favorite-list/products/count', { signal });
    },
    keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    staleTime: 0,
    select: (data) => {
      return data.data;
    }
  })
}

export function useGetUserProducts(userId, currentPage=1) {
  return useQuery({
    queryKey: ['getUserProducts', currentPage],
    queryFn: ({ signal }) => {

      const productPerPage = 9;
      const limit = `${productPerPage}`;
      const offset = `${productPerPage * (currentPage - 1)}`;
      const params = new URLSearchParams({ 
        userId: String(userId),
        limit: String(limit),
        offset: String(offset),
      });
      return axiosPrivate.get(`/products`, { params, signal });
    },
    // keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    // cacheTime: 0, // by default 5 mins
    staleTime: 0,
    select: (data) => {
      return data.data;
    },
  });
}


export function useDeleteUserProductById(currentPage=1) {
  
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteUserProductById'],
    mutationFn: (productId) => {
      return axiosPrivate.delete(`/products/${productId}`);
    },
    // when mutate is called
    onMutate: async (productId) => {

      await queryClient.cancelQueries(['getUserProducts', currentPage]);
      
      // snapshot the previous value
      const previousQueryData = queryClient.getQueryData(['getUserProducts', currentPage]) as any;
      
      if(previousQueryData) {
        // optimistically update to the new value
        queryClient.setQueryData(['getUserProducts', currentPage], {
          ...previousQueryData,
          data: [...previousQueryData.data.filter((item) => item.id !== productId)]
        })
      }

      // // optimistically update to the new value
      // queryClient.setQueryData(['getUserProducts'], old => {
      //   const oldQueryData = old as any;
      //   console.log({ oldQueryData });
      //   const optimisticData = {
      //     ...oldQueryData,
      //     data: [...oldQueryData.data.filter((item) => item.id !== productId)]
      //   }
      //   console.log({ optimisticData });
      //   return optimisticData
      // })
      
      console.log({ previousQueryData });

      // return a context object with the snapshotted value
      return { previousQueryData };
    },
    onError: (_error, productId, context) => {
      console.error({ _error });
      queryClient.setQueryData(['getUserProducts', currentPage], context?.previousQueryData);
    },
    // onSettled: (response, error, productId, context) => {
    //   // always refetch after error or success:
    //   console.log({ response, error, productId, context });
      
    //   const data = queryClient.getQueryData(['getUserProducts']);
    //   console.log({ data });
    //   queryClient.invalidateQueries(['getUserProducts']);
      
    // },
    
  });
}


export function useGetUserFavoriteProducts(currentPage=1) {
  return useQuery({
    queryKey: ['getUserFavoriteProducts', currentPage],
    queryFn: ({ signal }) => {
      const productPerPage = 9;
      const limit = `${productPerPage}`;
      const offset = `${productPerPage * (currentPage - 1)}`;
      const params = new URLSearchParams({ 
        limit: String(limit),
        offset: String(offset),
      });
      // const params = new URLSearchParams({ page: String(page) });
      return axiosPrivate.get(`/favorite-list/products`, { params, signal });
    },
    keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    // cacheTime: 10000, // by default 5 mins
    staleTime: 5000,
    select: (data) => {
      return data.data;
    },
  })
}

export function useAddProductToFavoriteList(productId) {

  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['addProductToFavoriteList'],
    mutationFn: async (productId) => {

    },

  })
}
