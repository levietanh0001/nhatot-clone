import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate, axiosPublic } from '@/utils/http.util';


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
    // onSettled: (data) => {
    //   // console.log({ data });
    // }
  });
}

export function useGetAllProducts() {

  return useQuery({
    queryKey: ['getAllProducts'],
    queryFn: ({ signal }) => {
      return axiosPrivate.get(`/admin/products`, { signal });
    },
    keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    cacheTime: 0, // by default 5 mins
    staleTime: 0,
    select: (data) => {
      return data.data;
    },
    
  });
}

export function usePaginateProducts(currentPage, productPerPage, filter) {

  const q = filter?.q;
  const type = filter?.type;
  const productType = type === 'can-ban' ? 'canban' : type === 'cho-thue' ? 'chothue' : '';
  const category = filter?.category;
  const userType = filter?.userType;

  let temp;
  Object.entries(filter).forEach(([key, value]) => {
    temp = {
      ...temp,
      ...(key) && { [String(key)]: value },
    };
  });
  
  temp = {
    ...(category) && { category },
    ...(userType) && { userType },
    ...(productType) && { type: productType },
    ...(q) && { q },
  };

  const criteria = {
    ...temp,
    limit: `${productPerPage}`,
    offset: `${productPerPage * (currentPage - 1)}`,
  };

  console.log({ paginateProductCriteria: criteria });

  return useGetProducts(criteria);
}

export function useSearchProducts(options={}) {

  const { query, type, category } = options as any;

  return useQuery({
    queryKey: ['searchProducts', query, type, category],
    enabled: !!query,
    queryFn: ({ signal }) => {
      const params = new URLSearchParams({ 
        query: query ?? ''
        // type, 
        // category 
      });
      return axiosPublic.get(`/products/search`, { params, signal });
    },
    // keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    cacheTime: 0, // by default 5 mins
    staleTime: 0,
    select: (data) => {
      return data.data;
    },
  });
}

export function useGetProductCount(options={}) {
  return useQuery({
    queryKey: ['getProductCount', options],
    queryFn: ({ signal }) => {
      // console.log({ options });
      const params = new URLSearchParams({
        userId: (options as any)?.userId ?? '',
        ...options
      });
      return axiosPublic.get('/products/count', { params, signal });
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

export function useGetFavoriteProductCount(userId, enabled=false) {
  return useQuery({
    queryKey: ['getFavoriteProductCount'],
    queryFn: ({ signal }) => {
      const params = new URLSearchParams({
        userId
        // userId: (options as any)?.userId
      });
      return axiosPrivate.get('favorite-list/products/count', { params, signal });
    },
    keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    staleTime: 0,
    select: (data) => {
      return data.data;
    },
    enabled
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
      return axiosPublic.get(`/products`, { params, signal });
    },
    // keepPreviousData: true,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    cacheTime: 0, // by default 5 mins
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


export function useDeleteProductsMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteProducts'],
    mutationFn: (productIds: string[]) => {

      return axiosPrivate.delete(`/admin/products`, { data: { productIds } });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getAllProducts']);
    },

  });
}


interface IUpdateProductParams {
  productId: string | number;
  newProduct: any;
}

export function useUpdateProductByIdMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateProductById'],
    mutationFn: (args: IUpdateProductParams) => {

      console.log({ args });
      const { productId, newProduct } = args;
      return axiosPrivate.put(`/admin/products/${productId}`, { newProduct });
    },
    onSettled: (data, error) => {
      // console.log({ data, error });
      queryClient.invalidateQueries(['getAllProducts']);
    },

  });
}


export function useGetUserFavoriteProducts(currentPage=1, enabled=false) {
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
    cacheTime: 0, // by default 5 mins
    staleTime: 0,
    select: (data) => {
      return data.data;
    },
    enabled
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


export function useGetProductCountByGroup() {
  return useQuery({
    queryKey: ['getProductCountByGroup'],
    queryFn: ({ signal }) => {
      return axiosPrivate.get(`/admin/products/count-by-group`, { signal });
    },
    keepPreviousData: false,
    refetchOnMount: true, // if component is mounted, refetch
    refetchOnWindowFocus: false,
    cacheTime: 0, // by default 5 mins
    staleTime: 0,
    select: (data) => {
      return data.data;
    },
  });
}
