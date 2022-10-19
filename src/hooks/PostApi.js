import request from '../utils/axios-utils';

export const getPosts = async () => {
  try {
    return await request({ url: '/posts', method: 'get' });
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

export const deletePost = async (id) => {
  try {
    return await request({ url: '/posts/'+id, method: 'delete'});
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updatePost = async (data) => {
  try {
     const id=data.id;
    return await request({ url: `posts/${id}`, method: 'patch',data:data });
  } catch (error) {
    console.log(error);
    return error;
  }
};
