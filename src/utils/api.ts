import { ApiPostCall } from '../types/types';

const API_URL = 'https://wf-challenge-t8hzk3ulmi.herokuapp.com/api';
const API_VERSION = 'v1';

const getList = async () => {
  const response = await fetch(`${API_URL}/${API_VERSION}/posts`);
  const data = await response.json()
  return data;
};

const postListItem = async (data: ApiPostCall) => {
  const response = await fetch(`${API_URL}/${API_VERSION}/posts`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
  });

  return response.json();
};

export default { getList, postListItem };
