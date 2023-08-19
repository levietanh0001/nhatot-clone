import PropTypes from 'prop-types';
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

useHandleQueryError.propTypes = {
  isError: PropTypes.bool,
  error: PropTypes.object
}


export default useHandleQueryError;