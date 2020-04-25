import { ApiEditCall, ApiPostCall } from '../types/types';

const API_URL = 'https://wf-challenge-t8hzk3ulmi.herokuapp.com/api';
const API_VERSION = 'v1';

const getList = async () => {
  const response = await fetch(`${API_URL}/${API_VERSION}/posts`);
  const data = await response.json()
  return data;
};

const getListItem = async (id: number) => {
  const response = await fetch(`${API_URL}/${API_VERSION}/posts/${id}`);
  const data = await response.json()
  return data;
};

const postListItem = async (data: ApiPostCall) => {
  const response = await fetch(`${API_URL}/${API_VERSION}/posts`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

const editListItem = async (id: number, data: ApiEditCall) => {
  const response = await fetch(`${API_URL}/${API_VERSION}/posts/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

const deleteListItem = async (id: number) => {
  const response = await fetch(`${API_URL}/${API_VERSION}/posts/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response;
};

export default { deleteListItem, editListItem, getList, getListItem, postListItem };
