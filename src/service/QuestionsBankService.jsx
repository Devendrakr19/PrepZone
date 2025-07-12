import http from './httpService';
import { handleSuccess } from '../utils/handleSuccess';
import { handleFailure } from '../utils/handleFailure';
import baseUrl from '../config';

const getToken = () => {
  return localStorage.getItem("token");
};

const questionBankService = () => {

  return {
    tradeList: async () => {
      const url = `${baseUrl}question-bank/trades/`;
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
    PoctradeList: async (sector_id) => {
      const url = `${baseUrl}question-bank/trades/?sector_id=${sector_id}`;
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
    questionsList: async (page, page_size, trade_id = '') => {
      let url = `${baseUrl}question-bank/questions-list/?page=${page}&page_size=${page_size}`;
      if (trade_id) {
        url += `&trade_id=${trade_id}`;
      }
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
    manualQuestionsCreation: async (formData) => {
      const url = `${baseUrl}question-bank/create-manual-question/`;
      // const data = {trade_id,
      //   Questions: [{Question: question,Choices: choices,Answer: [answer], Level_of_difficulty: difficulty,}]};
        try {
          const response = await http.post(url, formData, {
            headers: { Authorization: `Bearer ${getToken()}` }
          });
          
          handleSuccess(response.data, 'Successfully Submitted');
          return response.data;
        } catch (error) {
          handleFailure(error);
          throw error;
        }
    },
    imageQuestionsGeneration: async (formData) => {
      const url = `${baseUrl}question-bank/image-base-questions/`; 
        try {
          const response = await http.post(url, formData, {headers: { Authorization: `Bearer ${getToken()}` }});
          handleSuccess(response.data, 'Successfully Submitted');
          return response.data;
        } catch (error) {
          handleFailure(error);
          throw error;
        }
    },
    textQuestionsGeneration: async (formData) => {
      const url = `${baseUrl}question-bank/text-based-questions/`; 
        try {
          const response = await http.post(url, formData, {headers: { Authorization: `Bearer ${getToken()}` }});
          handleSuccess(response.data, 'Successfully Submitted');
          return response.data;
        } catch (error) {
          handleFailure(error);
          throw error;
        }
    },
    createGeneratedQuestions: async (formData) => {
      const url = `${baseUrl}question-bank/questions/create/`; 
        try {
          const response = await http.post(url, formData, {headers: { Authorization: `Bearer ${getToken()}` }});
          handleSuccess(response.data, 'Successfully Submitted');
          return response.data;
        } catch (error) {
          handleFailure(error);
          throw error;
        }
    },

  }
};

export default questionBankService;