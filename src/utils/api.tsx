const API_URL = 'https://wf-challenge-t8hzk3ulmi.herokuapp.com/api';
const API_VERSION = 'V1';

const getPostList = async () => {
  const response = await fetch(`${API_URL}/${API_VERSION}/posts`);
  const data = await response.json()
  return data;
};

export default { getPostList }
