import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

function useDecodeAccessToken(accessToken=localStorage.getItem('accessToken')): any {
  return jwtDecode(accessToken ?? '');
}

useDecodeAccessToken.propTypes = {
  accessToken: PropTypes.string
}

export default useDecodeAccessToken;