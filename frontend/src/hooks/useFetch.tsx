import { useState } from "react";


export default function useFetch(baseUrl) {

  const [loading, setLoading] = useState(false);

  function get(url) {
    return new Promise((resolve, reject) => {
      setLoading(true);
      fetch(baseUrl + url)
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            setLoading(false);
            return reject(data);
          }

          resolve(data);
          setLoading(false);
        })
        .catch((error) => {
          reject(error);
          setLoading(false);
        })
        .finally(() => setLoading(false))
    });
  }

  function post(url, body) {
    
    return new Promise((resolve, reject) => {

      setLoading(true);
      console.log({ url: url, baseUrl: baseUrl });
      console.log(new URL(url, baseUrl).href);
      
      fetch(new URL(url, baseUrl).href, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            setLoading(false);
            return reject(data);
          }

          resolve(data);
          setLoading(false);
        })
        .catch((error) => {
          reject(error);
          setLoading(false);
        })
        .finally(() => setLoading(false))
    });
  }

  return { get, post, loading };
}
