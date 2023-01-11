// hooks
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {

  return (
    <MAvatar
      src={jwt_decode(localStorage.getItem('token')).image}
      alt={jwt_decode(localStorage.getItem('token')).name}
      color={
        jwt_decode(localStorage.getItem('token')).image
          ? 'default'
          : createAvatar(jwt_decode(localStorage.getItem('token')).name).color
      }
      {...other}
    >
      {createAvatar(jwt_decode(localStorage.getItem('token')).name).name}
    </MAvatar>
  );
}