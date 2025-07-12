import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { logoutUser } from '../../redux/slice/AuthSlice';
import {CircularProgress} from "@mui/material";

const Logout = ({ onLogoutSuccess }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutLoading = useSelector((state) => state?.auth?.logoutLoading);
    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        console.log(refreshToken, "refreshToken");

        if (refreshToken) {
            try {
                await dispatch(logoutUser(refreshToken)).unwrap();
                localStorage.removeItem('refreshToken');
                if (onLogoutSuccess) {
                    onLogoutSuccess();
                }
                navigate('/');
            } catch (error) {
                console.error("Logout failed:", error);
            }
        } else {
            console.error("No refresh token found in local storage");
        }
    };
    return (
        <div onClick={handleLogout}>{logoutLoading ? (
            <CircularProgress size={25} sx={{ fontSize: 20, color: '#172052' }} />
        ) : (
            <>
                <LogoutOutlinedIcon sx={{ fontSize: 20, color: '#545454' }} />
                Logout
            </>
        )}</div>
    )
}

export default Logout