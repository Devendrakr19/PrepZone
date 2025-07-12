import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, FormControl, Select, MenuItem, Box } from '@mui/material';
import Grid from '@mui/material/Grid2'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { manualQuestionsCreationSlice, tradeLists } from '../../redux/slice/QuestionBankSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const AddManualQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const trades = useSelector((state) => state?.questionBank?.tradeListsData);
  const CreationLoading = useSelector((state) => state?.questionBank?.manualQuestionsCreationLoading);
  const apiResponse = useSelector((state) => state?.questionBank?.questionsListsData);
  const [selectedTrade, setSelectedTrade] = useState('');
  const [tradeName, setTradeName] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false); 
  
  // console.log("CreationLoading", CreationLoading);

  useEffect(() => {
    dispatch(tradeLists());
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      trade_id: '',
      question: '',
      choices: ['', '', '', ''],
      answer: '',
      difficulty: '',
      file: null
    },
    validationSchema: Yup.object({
      trade_id: Yup.string().required('Trade is required'),
      question: Yup.string().required('Question is required'),
      choices: Yup.array().of(Yup.string().required('All choices are required')),
      answer: Yup.string().required('Answer is required'),
      difficulty: Yup.string().required('Difficulty level is required')
    }),
    onSubmit: async (values) => { 
      const formData = new FormData();
      formData.append('trade_id', values.trade_id);
      formData.append('text', values.question);
      formData.append('level_of_difficulty', values.difficulty);
      formData.append('answer', values.answer); 
      formData.append('choices', JSON.stringify(values.choices.map((choice) => ({ text: choice }))));

      // Append the file if it exists
      if (file) {
        formData.append('image', file, file.name);
      }

      console.log("formData", Object.fromEntries(formData.entries()));

  
      console.log("formData", formData);
 
      try {
        const response = await dispatch(manualQuestionsCreationSlice(formData)).unwrap();    
        console.log("API Response:", response);  
        navigate("/questionsbank");
        formik.resetForm();
        setFile(null);
      } catch (error) {
        console.error('API Error:', error);
      }
    }    
  });
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && ['image/jpeg', 'image/png', 'image/svg+xml'].includes(selectedFile.type)) {
      setFile(selectedFile);
      formik.setFieldValue('file', selectedFile); // Update formik value if needed
    } else {
      alert('Only JPEG, JPG, PNG, and SVG files are allowed.');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };
  const handleRemoveFile = () => {
    setFile(null); 
  };
  return (
    <Box sx={{ backgroundColor: '#fff', p: 2, boxShadow: 3, borderRadius: 2 }} className='manrope'>
      <h2 className='text-[18px] font-[600] text-[#545454] mb-[20px] manrope'>
        Manual Question
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12, md: 7 }}>
            <Grid container spacing={2}>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <label className='text-[16px] font-[500] text-[#545454] roboto'>Trade Name</label>
                  <Select
                    value={formik.values.trade_id}
                    onChange={(e) => {
                      formik.setFieldValue('trade_id', e.target.value);
                      setSelectedTrade(e.target.value);
                    }}
                    sx={{ mt: '8px', height: 40 }}
                  >
                    {trades?.data?.map((trade) => (
                      <MenuItem key={trade.id} value={trade.id}>
                        {trade.name}
                      </MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }} >
                <label className='text-[16px] font-[500] text-[#545454] roboto'>Write your question here</label>
                <TextField
                  fullWidth
                  sx={{ mt: '8px', '& .MuiInputBase-root': { height: 40 } }}
                  variant="outlined"
                  name="question"
                  value={formik.values.question}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <label className='text-[16px] font-[500] text-[#545454] mb-[10px] roboto'>Write your Answers</label>
                <TextField
                  fullWidth
                  sx={{ mt: '8px', '& .MuiInputBase-root': { height: 40 } }}
                  variant="outlined"
                  name="answer"
                  value={formik.values.answer}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <label className='text-[16px] font-[500] text-[#545454]'>Level of Difficulty</label>
                  <Select
                    sx={{ mt: '8px', height: 40 }}
                    name="difficulty"
                    value={formik.values.difficulty}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="L1">Easy</MenuItem>
                    <MenuItem value="L2">Medium</MenuItem>
                    <MenuItem value="L3">Hard</MenuItem>
                  </Select>
                </FormControl>
              </Grid> 
            </Grid>

            <h2 className='text-[18px] font-[600] text-[#545454] my-[20px] manrope'>
              Options
            </h2>
            <Grid container spacing={2}>
              {formik.values.choices.map((choice, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <label className="text-[16px] font-[500] text-[#545454]">Option {index + 1}</label>
                  <TextField
                    fullWidth
                    sx={{ mt: '10px', '& .MuiInputBase-root': { height: 40 } }}
                    variant="outlined"
                    name={`choices[${index}]`}
                    value={formik.values.choices[index]}
                    onChange={formik.handleChange}
                  />
                </Grid>
              ))}
            </Grid>
            <div className='flex gap-[20px] mt-[20px]'>
              <button className='cursor-pointer border-[2px] border-[#172052] px-[20px] py-[5px] text-[16px] text-[#172052] font-[500] rounded manrope' onClick={() => {formik.resetForm(), setFile(null);}}>Cancel</button>
              <button className='cursor-pointer border-[2px] border-[#172052] bg-[#172052] px-[30px] py-[5px] text-[16px] text-[#ffff] font-[500] rounded manrope' type="submit" disabled={CreationLoading}>{CreationLoading ? "Saving..." : "Save" }</button>
            </div>
          </Grid>
          <Grid item size={{ xs: 12, md: 5 }} className='bg-[#F8F8FF] h-[500px] flex justify-center items-center p-[20px]'>
            <Box
              onDragEnter={!file ? handleDrag : undefined}
              onDragOver={!file ? handleDrag : undefined}
              onDragLeave={!file ? handleDrag : undefined}
              onDrop={!file ? handleDrop : undefined}
              className="modal_shadow w-full relative"
              sx={{
                // border: dragActive ? '' : '',
                borderRadius: 2,
                height: '100%',
                minHeight: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
              onClick={() =>{if(!file) document.getElementById('upload-file').click()}}
            >
              {file && (
                <div
                  className="absolute text-[#fff] right-0 top-0 cursor-pointer z-10 px-[3px] py-[2px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                >
                  <DeleteOutlineIcon  style={{ fontSize: "22px" }} className="text-[red]" />
                </div>
              )}
              <input
                type="file" 
                accept="image/jpeg, image/png, image/svg+xml"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="upload-file"
              />
              {file ? (
                <>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </>
              ) : (
                <>
                  <img src="/upload.svg" alt="Upload Icon" width="100" style={{ marginBottom: '10px' }} />
                  <p className='text-[20px] font-[500] text-[#545454] mt-[30px] manrope'>
                    Choose a file or Drag it here.
                  </p>
                  <p className='text-[16px] font-[500] text-[#A4A4A4] mt-[30px] manrope'>Support JPEG, JPG, PNG, and SVG</p>
                </>
              )}
            </Box>

          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddManualQuestion;






