import axios from 'axios';
var baseUrl="http://localhost:3000"

export const registerUser = async (Object) => {
  try {
    const res = await axios.post(`${baseUrl}/api/signup`, Object);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
