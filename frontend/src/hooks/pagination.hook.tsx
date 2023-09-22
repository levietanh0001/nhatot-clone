import { useEffect } from "react";

export function useSetCurrentPage(setCurrentPage, sessionKey='currentPage') {
  useEffect(() => {
    const storedPage = sessionStorage.getItem(sessionKey);

    if (storedPage) {
      setCurrentPage(JSON.parse(storedPage));
    }
  }, []);
}

export function useScrollToTopOnPageChange(currentPage) {
  useEffect(() => {
    window.scrollTo({ top: 10, behavior: 'smooth' });
  }, [currentPage]);
}

export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 10, behavior: 'smooth' });
  }, []);
}

export function useSetAvailablePages(productCount, productPerPage, setNumPages) {
  useEffect(() => {
    if(productCount && productPerPage) {
      setNumPages(Math.ceil(Number(productCount) / productPerPage));
    }
  }, [productCount, productPerPage]);
}