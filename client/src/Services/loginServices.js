import axios from 'axios';

export const doLogin = async (cred) => {
  let request = await axios.post(
    'v1/admin/login',
    {
      ...cred,
    },
    {
      headers: {
        'x-access-token': 'getAuthToken',
      },
    }
  );

  return request;
};
