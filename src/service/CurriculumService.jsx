import http from './httpService';
import { handleSuccess } from '../utils/handleSuccess';
import { handleFailure } from '../utils/handleFailure';
import baseUrl from '../config';

const getToken = () => {
  return localStorage.getItem("token");
};

const CurriculumService = () => {
  return {
      sectorList: async () => {
        const url = `${baseUrl}question-bank/sectors/`;
        try {
          const response = await http.get(url, {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          });
          return response.data;
        } catch (error) {
          handleFailure(error);
          throw error;
        }
      },
      curruculumList: async () => {
        const url = `${baseUrl}question-bank/curriculum-ebooks/`;
        try {
          const response = await http.get(url, {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          });
          return response.data;
        } catch (error) {
          handleFailure(error);
          throw error;
        }
      },
      CreateCurruculum: async (formData) => {
        const url = `${baseUrl}question-bank/curriculum-ebook/create/`;
        try {
          const response = await http.post(url, formData, {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          });
          return response.data;
        } catch (error) {
          handleFailure(error);
          throw error;
        }
      },
    }
}

export default CurriculumService