import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/AuthSlice.jsx';
import qaBankReducer from './slice/QuestionBankSlice.jsx'
import curriculumReducer from './slice/CurriculumSlice.jsx';

const store = configureStore({
    reducer: {
      auth: authReducer,
      questionBank: qaBankReducer,
      curriculum: curriculumReducer,
    },
  });
  
  export default store;