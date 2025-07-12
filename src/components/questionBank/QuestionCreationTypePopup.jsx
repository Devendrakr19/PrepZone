import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    px: "30px",
    pb: "30px",
    pt: "20px"
  };

const QuestionCreationTypePopup = ({open, handleClose}) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="add-question-modal-title"
            aria-describedby="add-question-modal-description"
        >
            <Box sx={modalStyle}>
                <div className='flex justify-between'>
                    <div className='text-[20px] font-[400] text-[#545454] mb-[20px] manrope'>Choose an option to create the Questions Bank</div>
                    <CloseIcon
                        onClick={handleClose}
                        sx={{
                            cursor: 'pointer',
                            color: '#666',
                            '&:hover': { color: '#000' },
                        }}
                    />
                </div>
                <div className='flex justify-between gap-[50px]'>
                    <NavLink to='/questionsbank/addmanual' className='modal_shadow h-[200px] w-[400px] flex flex-col justify-center items-center p-[20px]'>
                        <img src='/manual.svg' alt="manual" className='mx-auto' />
                        <div className='text-[18px] text-[#172052] font-[600] manrope mt-[25px]'>Manual Questions</div>
                    </NavLink>
                    <NavLink to='/questionsbank/generate-question' className='modal_shadow h-[200px] w-[400px] flex flex-col justify-center items-center p-[20px]'>
                    {/* <div className='modal_shadow h-[200px] w-[400px] flex flex-col justify-center items-center  p-[20px] cursor-pointer'> */}
                        <img src='/generate.svg' alt="generate" className='mx-auto' />
                        <div className='text-[18px] text-[#172052] font-[600] manrope mt-[20px]'>Generate Questions </div>
                    {/* </div> */}
                    </NavLink>
                </div>
            </Box>
        </Modal>
    )
}

export default QuestionCreationTypePopup