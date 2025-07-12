import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionBankService from "../../service/QuestionsBankService";

export const tradeLists = createAsyncThunk(
    'questionBank/tradeLists',
    async (_, thunkAPI) => {
        try {
            const response = await questionBankService().tradeList();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const PoctradeListSlice = createAsyncThunk(
    'questionBank/PoctradeListSlice',
    async (sector_id, thunkAPI) => {
        try {
            const response = await questionBankService().PoctradeList(sector_id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const questionsLists = createAsyncThunk(
    'questionBank/questionsLists',
    async ({ page, page_size, trade_id }, thunkAPI) => {
        try {
            const response = await questionBankService().questionsList(page, page_size, trade_id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const manualQuestionsCreationSlice = createAsyncThunk(
    'questionBank/manualQuestionsCreationSlice',
    async (formData, thunkAPI) => {
      try {
        const response = await questionBankService().manualQuestionsCreation(formData);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  );
  export const imageQuestionsGenerationSlice = createAsyncThunk(
    'questionBank/imageQuestionsGenerationSlice',
    async (formData, thunkAPI) => {
      try {
        const response = await questionBankService().imageQuestionsGeneration(formData);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  );
  export const textQuestionsGenerationSlice = createAsyncThunk(
    'questionBank/textQuestionsGenerationSlice',
    async (formData, thunkAPI) => {
      try {
        const response = await questionBankService().textQuestionsGeneration(formData);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  );
  export const createGeneratedQuestionsSlice = createAsyncThunk(
    'questionBank/createGeneratedQuestionsSlice',
    async (formData, thunkAPI) => {
      try {
        const response = await questionBankService().createGeneratedQuestions(formData);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  );
  




const questionBankSlice = createSlice({
    name: 'questionBank',
    initialState: {
        tradeListsData: {},
        tradeListsLoading: false,
        PoctradeListData: {},
        PoctradeListLoading: false,
        questionsListsData: {},
        questionsListsLoading: false,
        // textQuestionsGenerationData: {},
        textQuestionsGenerationLoading: false,
        // imageQuestionsGenerationData: {},
        imageQuestionsGenerationLoading: false,
        createGeneratedQuestionsLoading: false,
        manualQuestionsCreationLoading: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(tradeLists.pending, (state) => {
                state.tradeListsLoading = true;
                state.error = null;
            })
            .addCase(tradeLists.fulfilled, (state, action) => {
                state.tradeListsData = action.payload;
                state.tradeListsLoading = false;
            })
            .addCase(tradeLists.rejected, (state, action) => {
                state.tradeListsLoading = false;
                state.error = action.payload;
            })
            .addCase(PoctradeListSlice.pending, (state) => {
                state.PoctradeListLoading = true;
                state.error = null;
            })
            .addCase(PoctradeListSlice.fulfilled, (state, action) => {
                state.PoctradeListData = action.payload;
                state.PoctradeListLoading = false;
            })
            .addCase(PoctradeListSlice.rejected, (state, action) => {
                state.PoctradeListLoading = false;
                state.error = action.payload;
            })
            .addCase(questionsLists.pending, (state) => {
                state.questionsListsLoading = true;
                state.error = null;
            })
            .addCase(questionsLists.fulfilled, (state, action) => {
                state.questionsListsData = action.payload;
                state.questionsListsLoading = false;
            })
            .addCase(questionsLists.rejected, (state, action) => {
                state.questionsListsLoading = false;
                state.error = action.payload;
            })
            .addCase(textQuestionsGenerationSlice.pending, (state) => {
                state.textQuestionsGenerationLoading = true;
                state.error = null;
            })
            .addCase(textQuestionsGenerationSlice.fulfilled, (state, action) => {
                // state.textQuestionsGenerationData = action.payload;
                state.textQuestionsGenerationLoading = false;
            })
            .addCase(textQuestionsGenerationSlice.rejected, (state, action) => {
                state.textQuestionsGenerationLoading = false;
                state.error = action.payload;
            })
            .addCase(imageQuestionsGenerationSlice.pending, (state) => {
                state.imageQuestionsGenerationLoading = true;
                state.error = null;
            })
            .addCase(imageQuestionsGenerationSlice.fulfilled, (state, action) => {
                // state.imageQuestionsGenerationData = action.payload;
                state.imageQuestionsGenerationLoading = false;
            })
            .addCase(imageQuestionsGenerationSlice.rejected, (state, action) => {
                state.imageQuestionsGenerationLoading = false;
                state.error = action.payload;
            })
            .addCase(createGeneratedQuestionsSlice.pending, (state) => {
                state.createGeneratedQuestionsLoading = true;
                state.error = null;
            })
            .addCase(createGeneratedQuestionsSlice.fulfilled, (state, action) => {
                // state.imageQuestionsGenerationData = action.payload;
                state.createGeneratedQuestionsLoading = false;
            })
            .addCase(createGeneratedQuestionsSlice.rejected, (state, action) => {
                state.createGeneratedQuestionsLoading = false;
                state.error = action.payload;
            })
            .addCase(manualQuestionsCreationSlice.pending, (state) => {
                state.manualQuestionsCreationLoading = true;
                state.error = null;
            })
            .addCase(manualQuestionsCreationSlice.fulfilled, (state, action) => {
                // state.imageQuestionsGenerationData = action.payload;
                state.manualQuestionsCreationLoading = false;
            })
            .addCase(manualQuestionsCreationSlice.rejected, (state, action) => {
                state.manualQuestionsCreationLoading = false;
                state.error = action.payload;
            })
    },
});

export const {  } = questionBankSlice.actions;
export default questionBankSlice.reducer;