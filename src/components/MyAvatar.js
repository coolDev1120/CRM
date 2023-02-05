// hooks
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';

export default function MyAvatar({ ...other }) {
  const image = jwt_decode(localStorage.getItem('token')).image
  return (
    <>
      {image === 'public/avatar/user_default.gif' &&
        <MAvatar
          src={jwt_decode(localStorage.getItem('token')).image}
          color={
            jwt_decode(localStorage.getItem('token')).image
              ? 'default'
              : createAvatar(jwt_decode(localStorage.getItem('token')).name).color
          }
          {...other}
        >
          {createAvatar(jwt_decode(localStorage.getItem('token')).name).name}
        </MAvatar>
      }

      {image !== 'public/avatar/user_default.gif' &&
        // eslint-disable-next-line jsx-a11y/alt-text
        <img src={`${process.env.REACT_APP_SERVER_URL}/` + image} style={{ borderRadius: '100%' }} />
      }

    </>
  );
}
