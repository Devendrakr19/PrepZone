import http from './httpService';
import { handleSuccess } from '../utils/handleSuccess';
import { handleFailure } from '../utils/handleFailure';
import baseUrl from '../config';
// import { getConfig } from '../utils/LoginTokenConfig';

const getToken = () => {
  return localStorage.getItem("token");
};

const authService = () => {

    return {
      login: async (email, password) => {
        const url = `${baseUrl}auth/login/`;
        const data = { email, password };
        try {
          const response = await http.post(url, data);
          handleSuccess(response.data, 'Login Successful');
          return response.data;
        } catch (error) {
          handleFailure(error);
          throw error;
        }
      },
      verifyOtp: async (email, otp) => {
        const url = `${baseUrl}auth/verify-login-otp/`;
        const data = { email, otp };
        try {
          const response = await http.post(url, data);
          handleSuccess(response.data, 'Login Successful');
          return response.data;
        } catch (error) {
          handleFailure(error);
          throw error;
        }
      },
      logout: async (refresh) => {
        const url = `${baseUrl}auth/logout/`;
        try {
          const response = await http.post(url, {refresh}, {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }});
          handleSuccess(response.data, 'Locked Out');
          return response.data;
        } catch (error) {
          handleFailure(error);
          throw error;
        }
      },
    }
  
  };
  
  export default authService;