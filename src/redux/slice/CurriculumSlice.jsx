import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CurriculumService from "../../service/CurriculumService";

export const sectorListSlice = createAsyncThunk(
    'questionBank/sectorListSlice',
    async (_, thunkAPI) => {
        try {
            const response = await CurriculumService().sectorList();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const curruculumListSlice = createAsyncThunk(
    'questionBank/curruculumListSlice',
    async (_, thunkAPI) => {
        try {
            const response = await CurriculumService().curruculumList();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const CreateCurruculumSlice = createAsyncThunk(
    'questionBank/CreateCurruculumSlice',
    async (formData, thunkAPI) => {
        try {
            const response = await CurriculumService().CreateCurruculum(formData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


const CurriculumSlice = createSlice({
    name: 'curriculum',
    initialState: {
        sectorListData: {},
        sectorListLoading: false,
        curruculumListData: {},
        curruculumListLoading: false,
        CreateCurruculumData: {},
        CreateCurruculumLoading: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(sectorListSlice.pending, (state) => {
                state.sectorListLoading = true;
                state.error = null;
            })
            .addCase(sectorListSlice.fulfilled, (state, action) => {
                state.sectorListData = action.payload;
                state.sectorListLoading = false;
            })
            .addCase(sectorListSlice.rejected, (state, action) => {
                state.sectorListLoading = false;
                state.error = action.payload;
            })
            .addCase(curruculumListSlice.pending, (state) => {
                state.curruculumListLoading = true;
                state.error = null;
            })
            .addCase(curruculumListSlice.fulfilled, (state, action) => {
                state.curruculumListData = action.payload;
                state.curruculumListLoading = false;
            })
            .addCase(curruculumListSlice.rejected, (state, action) => {
                state.curruculumListLoading = false;
                state.error = action.payload;
            })
            .addCase(CreateCurruculumSlice.pending, (state) => {
                state.CreateCurruculumLoading = true;
                state.error = null;
            })
            .addCase(CreateCurruculumSlice.fulfilled, (state, action) => {
                state.CreateCurruculumData = action.payload;
                state.CreateCurruculumLoading = false;
            })
            .addCase(CreateCurruculumSlice.rejected, (state, action) => {
                state.CreateCurruculumLoading = false;
                state.error = action.payload;
            })
    },
});

export const { } = CurriculumSlice.actions;
export default CurriculumSlice.reducer;