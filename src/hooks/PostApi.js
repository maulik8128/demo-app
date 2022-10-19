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
    return await request({ url: '/posts/' + id, method: 'delete' });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updatePost = async (data) => {
  try {
    const id = data.id;
    return await request({ url: `posts/${id}`, method: 'patch', data: data });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const registerUser = async (data) => {
  try {
    const res = await request({
      url: '/signup',
      methods: 'post',
      data: data,
      headers: {
        'Content-Type':
          'multipart/form-data; boundary=AaB03x' +
          '--AaB03x' +
          'Content-Disposition: file' +
          'Content-Type: png' +
          'Content-Transfer-Encoding: binary' +
          '...data... ' +
          '--AaB03x--',
        Accept: 'application/json',
        type: 'formData',
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
