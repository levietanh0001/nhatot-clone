import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

function useDecodeAccessToken(accessToken=localStorage.getItem('accessToken')): object | null {
  try {
    return jwtDecode(accessToken ?? '');
  } catch(error) {
    console.error(error);
    return null;
  }
}

useDecodeAccessToken.propTypes = {
  accessToken: PropTypes.string
}

export default useDecodeAccessToken;