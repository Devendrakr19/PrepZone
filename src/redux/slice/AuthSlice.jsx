import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../service/AuthService";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await authService().login(email, password);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const verifyUser = createAsyncThunk(
    'auth/verifyUser',
    async ({email, otp}, thunkAPI) => {
        try {
            const response = await authService().verifyOtp(email, otp);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (refresh, thunkAPI) => {
        try {
            console.log("Logging out with token:", refresh);
            const response = await authService().logout(refresh);
            localStorage.removeItem("token"); 
            localStorage.removeItem("refreshToken");
            return response;
        } catch (error) {
            console.error("Logout API Error:", error.response?.data || error.message);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loginData: {},
        verifyData : {},
        verifyLoading : false,
        logoutData : {},
        logoutLoading : false
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loginLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loginData = action.payload;
                state.loginLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loginLoading = false;
                state.error = action.payload;
            })
            .addCase(verifyUser.pending, (state) => {
                state.verifyLoading = true;
                state.error = null;
            })
            .addCase(verifyUser.fulfilled, (state, action) => {
                state.verifyData = action.payload;
                state.verifyLoading = false;
            })
            .addCase(verifyUser.rejected, (state, action) => {
                state.verifyLoading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.logoutLoading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.logoutData = action.payload;
                state.logoutLoading = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.logoutLoading = false;
                state.error = action.payload;
            })
    },
});

export const { setToken, setRoles, setSelectedRole, logout } = authSlice.actions;
export default authSlice.reducer;