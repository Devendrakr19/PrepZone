import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, verifyUser } from '../../redux/slice/AuthSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loginLoading } = useSelector((state) => state?.auth);
    const verifyLoading  = useSelector((state) => state?.auth?.verifyLoading);
    console.log(verifyLoading, "verifyLoading");
    

    const handleShow = () => setShow(!show);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please fill in all fields!');
            return;
        }
        try {
            const response = await dispatch(loginUser({ email, password })).unwrap();
            console.log(response, "Login Response");

            if (response?.message?.includes("OTP sent to your email")) {
                toast.success('OTP sent to your email! 🚀');
                setIsOtpSent(true);
            } else {
                toast.error('Login failed!');
            }
        } catch (err) {
            toast.error(err?.detail || 'Login failed. Please try again!');
        }
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // Allow only numbers
        let newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Keep only the last digit entered
        setOtp(newOtp);

        // Move to the next input if a digit is entered
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join(""); // Convert array to string
        if (otpCode.length !== 6) {
            toast.error('Enter a valid 6-digit OTP');
            return;
        }
        try {
            const response = await dispatch(verifyUser({ email, otp: otpCode })).unwrap();
            if (response?.access) {
                localStorage.setItem("token", response.access);
                localStorage.setItem("refreshToken", response.refresh);
                toast.success('Login successful! 🚀');
                navigate("/dashboard");
            } else {
                toast.error('Invalid OTP. Please try again!');
            }
        } catch (err) {
            toast.error(err?.detail || 'OTP verification failed!');
        }
    };

    return (
        <div className="flex w-screen h-screen bg-[#fff]">
            <ToastContainer />
            <div className='w-[60%] flex items-center justify-center p-[10px]'>
                <div className="modal_shadow w-full h-full flex items-center justify-center rounded-[20px] bg-[#FDFDFD]">
                    <img src="/loginside.svg" alt="Cyclist Illustration" className="w-[593px] h-[428px]" />
                </div>
            </div>
            <div className="w-[40%] flex flex-col justify-center items-center px-[50px] bg-[#FFFFFF]">
                <div className='modal_shadow rounded-[10px] p-[50px]'>
                    <div className="mb-6 text-center">
                        <img src="/nimi_logo.svg" alt="Nimi Logo" className="w-32 mx-auto" />
                        <h2 className="text-[16px] font-[500] text-[#545454] mt-2">
                            National Instructional Media Institute
                        </h2>
                    </div>
                    <div className="w-full max-w-md">
                        {!isOtpSent ? (
                            <form onSubmit={handleLogin}>
                                <h2 className="text-[26px] text-[#545454] font-[500] mb-4 text-center manrope">
                                    Log In to Your Account
                                </h2>
                                <div className="flex items-center border-[#939393] border-[2px] rounded-lg px-3 py-2 bg-[#ffff] mb-4">
                                    <span className="text-gray-500">
                                        <img src="/email.svg" alt="Email" className="w-[25px] mx-auto" />
                                    </span>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="ml-2 bg-transparent outline-none w-full text-gray-700"
                                    />
                                </div>
                                <div className="flex items-center border-[#939393] border-[2px] rounded-lg px-3 py-2 bg-[#fff]">
                                    <span className="text-gray-500">
                                        <img src="/password.svg" alt="Password" className="w-[25px] mx-auto" />
                                    </span>
                                    <input
                                        type={show ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="ml-2 bg-transparent outline-none w-full text-gray-700"
                                    />
                                    <button type="button" className='cursor-pointer' onClick={handleShow}>
                                        {show ? <VisibilityOffIcon className='text-[#939393]' /> : <VisibilityIcon className='text-[#939393]' />}
                                    </button>
                                </div>
                                <div className="text-right mb-4">
                                    <a href="#" className="text-gray-500 text-sm hover:underline">Forgot Password?</a>
                                </div>
                                <button type="submit" className="cursor-pointer w-full bg-[#172052] text-white py-[12px] rounded-lg font-semibold hover:bg-blue-900">
                                    {loginLoading ? 'Logging in...' : 'LOG IN'}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleOtpSubmit}>
                                <h2 className="text-[26px] text-[#545454] font-[500] mb-4 text-center manrope">
                                    Verify your code
                                </h2>
                                <div className='text-[18px] font-[500] text-[#545454] text-center mb-[20px]'>
                                    We have sent a code to your email <br />
                                    is {email && `***${email.substring(3)}`}
                                </div>

                                <div className="flex justify-center space-x-2 mb-4">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            maxLength="1"
                                            className="w-12 h-[55px] text-center border border-[#BBBBBB] rounded-[4px] text-lg"
                                        />
                                    ))}
                                </div>
                                <button type="submit" className="w-full bg-[#172052] text-white py-[12px] rounded-lg font-semibold hover:bg-blue-900 mt-[20px] cursor-pointer">
                                    {verifyLoading ? "Verifing..." : "Verify OTP"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;