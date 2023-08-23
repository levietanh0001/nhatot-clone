import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function useHandleQueryError(isError, error) {

  const navigate = useNavigate();

  useEffect(() => {
    
    if(isError) {
      console.error(error);
      navigate('/404');
      return;
    }

  }, [isError]);
}


export default useHandleQueryError;