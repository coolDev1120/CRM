import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
// hooks
// pages
import Login from '../pages/authentication/Login';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
  const { pathname } = useLocation();
  console.log(pathname);

  // if (!isAuthenticated) {
  //   if (pathname !== requestedLocation) {
  //     setRequestedLocation(pathname);
  //   }
  //   return <Login />;
  // }
  if (!localStorage.getItem('token') || !jwt_decode(localStorage.getItem('token')).role) {
    // window.location = '/auth';
    return <Login />;
  }
  // if (requestedLocation && pathname !== requestedLocation) {
  //   setRequestedLocation(null);
  //   return <Navigate to={requestedLocation} />;
  // }

  return <>{children}</>;
}
