import React, { useState } from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Menu, MenuItem, Avatar, Box } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import Logout from '../auth/Logout';

const Header = ({ toggleSidebarWidth }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='shadow h-[60px] py-[6px] px-[15px] flex justify-between items-center bg-[#fff] rounded-[4px] mb-[10px]'>
            <div className='w-full flex gap-[10px] items-center justify-between'>
                <MenuOutlinedIcon
                    onClick={toggleSidebarWidth}
                    className="cursor-pointer !text-[40px] text-[#545454]"
                />
                <div className='flex items-center gap-[10px] relative'>
                    <div>Deepak</div>
                    <img onClick={handleClick}
                        src='/profile.jpg'
                        alt='profile'
                        className="mx-auto w-[50px] h-[50px] rounded-[10px] border-[2.3px] border-[#172052] overflow-hidden cursor-pointer" />
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        // className='relative'
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        PaperProps={{
                            sx: {
                                borderRadius: 1,
                                overflow: 'visible',
                                // boxShadow: 3,
                                padding: '0 5px',
                                backgroundColor: '#fff',
                                border: '2px solid #172052',
                                mt: 1,
                                minWidth: 180,
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '-6px',
                                    right: '20px',
                                    width: '10px',
                                    height: '10px',
                                    backgroundColor: '#fff',
                                    border: '2px solid #172052',
                                    transform: 'rotate(45deg)',
                                    zIndex: -1,
                                },
                                '& .MuiMenuItem-root': {
                                    fontSize: 16,
                                    fontWeight: 500,
                                    borderBottom: '1px solid #BBBBBB',
                                    '&:last-child': {
                                        borderBottom: 'none',
                                    },
                                    '& svg': {
                                        mr: 1,
                                        fontSize: 20,
                                        color: '#545454',
                                    },
                                },
                            },
                        }}
                    >
                        <MenuItem onClick={handleClose} sx={{
                            fontSize: '14px',
                            color: '#545454',
                            fontWeight: 500,
                            fontFamily: 'Manrope, sans-serif',
                            '&:hover': {
                                backgroundColor: '#F0F0F5',
                            },
                        }}>
                            <PersonOutlineIcon />
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose} sx={{
                            fontSize: '14px',
                            color: '#545454',
                            fontWeight: 500,
                            fontFamily: 'Manrope, sans-serif',
                            '&:hover': {
                                backgroundColor: '#F0F0F5',
                            },
                        }}>
                            <VpnKeyOutlinedIcon />
                            Password
                        </MenuItem>
                        <MenuItem onClick={(event) => event.stopPropagation()} sx={{
                            fontSize: '14px',
                            color: '#545454',
                            fontWeight: 500,
                            fontFamily: 'Manrope, sans-serif',
                            '&:hover': {
                                backgroundColor: '#F0F0F5',
                            },
                        }}>
                            <Logout onLogoutSuccess={handleClose}/>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Header;
