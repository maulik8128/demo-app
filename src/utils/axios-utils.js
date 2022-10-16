// import axios from 'axios';
import axios from 'axios';
import baseURL from './baseURL';
const client = axios.create({baseURL});

const request = ({...config}) => {
  client.defaults.headers.common.Authorization = `Bearer token`;

  const onSuccess = (response) => response;

  const onError = (error) => {
    //option catch error
    return error;
  };

  return client(config).then(onSuccess).catch(onError);
};

export default request;
