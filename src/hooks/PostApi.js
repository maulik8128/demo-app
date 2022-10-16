import request from '../utils/axios-utils';

export const getPosts = async ({ queryKey }) => {
  try {
    return await request({ url: '/posts', method: 'get', data: queryKey[1] });
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getPost = async ({ queryKey }) => {
  try {
    return await request({ url: `posts/${queryKey[1]}`, method: 'get' });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deletePost = async (data) => {
  try {
    return await request({ url: '/posts', method: 'delete', data: data });
  } catch (error) {
    console.log(error);
    return error;
  }
};
