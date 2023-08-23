import { useEffect } from "react";
import { axiosPrivate } from "~/utils/axios.util";

export function addProductToFavoriteList(favoriteProductId) {
  return axiosPrivate.post(`favorite-list/${String(favoriteProductId)}`);
}

export function removeProductFromFavoriteList(favoriteProductId) {
  return axiosPrivate.delete(`favorite-list/${String(favoriteProductId)}`);
}

export const updateFavoriteList = (productId, favoriteProductIds, setFavoriteProductIds, authContext) => {

  console.log({ favoriteProductIds });

  if (favoriteProductIds && !favoriteProductIds.includes(productId)) {
    addProductToFavoriteList(productId)
      .then(() => {
        console.log('adding product to favorite list');
        return axiosPrivate.get('favorite-list');
      })
      .then((response) => {

        const data = response.data;

        if (data) {
          if (!data.productIds) {
            setFavoriteProductIds([]);
          }

          if (data.productIds) {
            // if unauthorized, will be undefined, requires refreshing token before sending request
            setFavoriteProductIds(data.productIds);
          }
        }
      })
      .catch((error) => {
        console.error(error);

        if (error.name === 'USER_NOT_FOUND') {
          authContext?.redirectToRegisterPage();
        } else {
          authContext?.redirectToLoginPage();
        }
      });
  } else if (favoriteProductIds && favoriteProductIds.includes(productId)) {
    removeProductFromFavoriteList(productId)
      .then(() => {
        console.log('removing product from favorite list');
        return axiosPrivate.get('favorite-list');
      })
      .then((response) => {

        const data = response.data;

        if (data) {
          if (!data.productIds) {
            setFavoriteProductIds([]);
          }

          if (data.productIds) {
            setFavoriteProductIds(data.productIds);
          }
        }
      })
      .catch((error) => {
        console.error(error);

        if (error.name === 'USER_NOT_FOUND') {
          authContext?.redirectToRegisterPage();
        } else {
          authContext?.redirectToLoginPage();
        }
      });
  }
};

export const usePopulateFavoritelist = (setFavoriteProductIds) => {
  useEffect(() => {

    const controller = new AbortController();

    async function favoriteListPopulate() {
      try {
        // const data = await getFavoriteList(accessToken, controller.signal);
        const response = await axiosPrivate.get('favorite-list', {
          signal: controller.signal,
        });
        const data = response.data;
        if (data && data.productIds) {
          setFavoriteProductIds(data.productIds);
        }
      } catch (error) {
        console.error(error);
      }
    }

    favoriteListPopulate();

    return () => {
      controller.abort();
    };
  }, []);
}