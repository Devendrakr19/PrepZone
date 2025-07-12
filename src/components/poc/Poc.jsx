import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid2"; 
import { Box, FormControl, MenuItem, Select, styled, Switch, TextField } from "@mui/material";
import GeneratedQuestins from "./GeneratedQuestins";
import { imageQuestionsGenerationSlice, textQuestionsGenerationSlice, PoctradeListSlice} from "../../redux/slice/QuestionBankSlice";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { sectorListSlice } from "../../redux/slice/CurriculumSlice";

const Poc = () => {
  const dispatch = useDispatch();
  const { PoctradeListData, imageQuestionsGenerationLoading, textQuestionsGenerationLoading } = useSelector((state) => state.questionBank);
  const tradesDropdown = useSelector((state) => state?.curriculum?.sectorListData?.data) || [];
  const [openGenerate, setOpenGenerate] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadImage, setUploadImage] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState('all');
  const [totalQuestion, setTotalQuestion] = useState("");
  const [responseKey, setResponseKey] = useState(0);

  console.log("PoctradeListData", PoctradeListData);
  const [textResponse, setTextResponse] = useState(null);
  const [imgResponse, setImgResponse] = useState(null);

  const [sectorId, setSectorId] = useState("");


  useEffect(() => {
    dispatch(sectorListSlice()); 
  }, [dispatch]);

  useEffect(() => { 
    if(sectorId){
      dispatch(PoctradeListSlice(sectorId));
    }
  }, [dispatch, sectorId]);

  // const validationSchema = Yup.object().shape({
  //   trade_id: Yup.string().required("Trade Name is required"),
  //   level_of_difficulty: Yup.string().required("Difficulty level is required"),
  // });

  const formik = useFormik({
    initialValues: {
      trade_id: "",
      trade_name: "",
      level_of_difficulty: "",
      uploadImage: false,
    },
    onSubmit: async (values) => {
      console.log("Form Values:", values);
      const formData = new FormData();
      formData.append("trade_id", values.trade_id);
      formData.append("trade_name", values.trade_name);
      formData.append("level_of_difficulty", values.level_of_difficulty);

      if (values.uploadImage && file) {
        formData.append("image", file, file.name);
        try {
          const imgResponse = await dispatch(imageQuestionsGenerationSlice(formData)).unwrap();
          setImgResponse(imgResponse);
        } catch (error) {
          console.error("Image API Error:", error);
        }
      } else {
        try {
          const textResponse = await dispatch(textQuestionsGenerationSlice(formData)).unwrap();
          setTextResponse(textResponse);
        } catch (error) {
          console.error("Text API Error:", error);
        }
      }
      setResponseKey((prevKey) => prevKey + 1);
      setOpenGenerate(true);
    },
  });

  const handleSelectChange = (event) => {
    const value = event.target.value;
    console.log("value", value)
    setSelectedTrade(value);
    setSectorId(value);  
  };

  const handleGenerate = (event) => {
    event.preventDefault();
    // if (formik.values.uploadImage && file) {
    formik.handleSubmit();
    // } else {
    //   alert("Please upload an image before generating questions.");
    // }
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // console.log("Selected File:", selectedFile); // Debugging
      setFile(selectedFile);
      formik.setFieldValue("uploadImage", true);
    } else {
      alert("Invalid file type. Only JPEG, PNG, and SVG are allowed.");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragover");
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

  const CustomSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-thumb": {
      color: "#172052",
    },
    "& .Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#ffffff",
      border: "2px solid #172052",
    },
  }));

  const handleTradeChange = (event) => {
    const value = event.target.value;
    const selectedTrade = PoctradeListData?.data.find((trade) => trade.id === value);
  
    // console.log("Selected Trade:", selectedTrade);
  
    formik.setFieldValue("trade_id", selectedTrade?.id || "");
    formik.setFieldValue("trade_name", selectedTrade?.name || "");
  };
  

  return (
    <div>
      <Box
        sx={{ backgroundColor: "#fff", p: 2, boxShadow: 3, borderRadius: 2 }}
        className="manrope"
      >
        <h2 className="text-[18px] font-[600] text-[#545454] mb-[20px] manrope">
          Text
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <label className="text-[16px] font-[500] text-[#545454]">
                  Sector Name
                </label>
                <Select sx={{ mt: "8px", height: 40 }} value={selectedTrade}
                  onChange={handleSelectChange} name="difficulty">
                  {/* <MenuItem value="all">All</MenuItem> */}
                  {tradesDropdown.map((trade) => (
                    <MenuItem key={trade.id} value={trade.id}>
                      {trade.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <label className="text-[16px] font-[500] text-[#545454]">
                  Trade Name
                </label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="trade_id"
                  value={formik.values.trade_id}
                  // onChange={formik.handleChange}
                  onChange={handleTradeChange}
                  sx={{ mt: "8px", height: 40 }}
                >
                  {/* <MenuItem value="all">All</MenuItem> */}
                  {PoctradeListData?.data?.map((trade) => (
                    <MenuItem key={trade.id} value={trade.id}>
                      {trade.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <label className="text-[16px] font-[500] text-[#545454]">
                  Level of Difficulty
                </label>
                <Select sx={{ mt: "8px", height: 40 }} name="level_of_difficulty" value={formik.values.level_of_difficulty}
                  onChange={formik.handleChange}>
                  <MenuItem value="L1">Easy</MenuItem>
                  <MenuItem value="L2">Medium</MenuItem>
                  <MenuItem value="L3">Hard</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item size={{ xs: 6, sm: 12 }}>
              <div className=" w-[18%] flex justify-between items-center border-[2px] border-[#172052] rounded px-[6px]">
                <span>Upload Image</span>
                <CustomSwitch
                  checked={formik.values.uploadImage}
                  onChange={() => formik.setFieldValue("uploadImage", !formik.values.uploadImage)}
                />
              </div>
            </Grid>
            {formik.values.uploadImage && (
              <Grid item size={{ xs: 12, sm: 12 }}>
                <Box
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className="modal_shadow w-full relative"
                  sx={{
                    height: "100%",
                    minHeight: 250,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                    overflow: "hidden",
                    paddingTop: "10px",
                    backgroundColor: "#F8F8FF",
                  }}
                  onClick={() => document.getElementById("upload-file").click()}
                >
                  {file && (
                    <div
                      className="absolute text-[#fff] right-0 top-0 cursor-pointer z-10 px-[4px] py-[3px]"
                      onClick={(e) => {
                        e.stopPropagation(); 
                        setFile(null);
                      }}
                    >
                      <DeleteOutlineIcon  style={{ fontSize: "22px" }} className="text-[red]" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/svg+xml"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="upload-file"
                  />
                  {file ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Uploaded Preview"
                      style={{
                        width: "60%",
                        height: "60%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <>
                      <img
                        src="/upload.svg"
                        alt="Upload Icon"
                        width="100"
                        style={{ marginBottom: "10px" }}
                      />
                      <p className="text-[20px] font-[500] text-[#545454] mt-[30px] manrope">
                        Choose a file or Drag it here.
                      </p>
                      <p className="text-[16px] font-[500] text-[#A4A4A4] mt-[30px] manrope">
                        Support JPEG, JPG, PNG, SVG, WORD, PDF
                      </p>
                    </>
                  )}
                </Box>
              </Grid>
            )}
          </Grid>
          <div className="mt-[20px] mb-[20px] flex items-center gap-[15px]">
            <button
              className="border-[2px] border-[#172052] bg-[#172052] px-[30px] py-[5px] text-[16px] text-[#ffff] font-[500] rounded manrope cursor-pointer"
              type="button"
              onClick={handleGenerate}
            >
              {textQuestionsGenerationLoading || imageQuestionsGenerationLoading ? "Generating..." : totalQuestion ? "Regenerate" : "Generate"}
            </button>

            {totalQuestion > 0 && (
              <button type="button" className="border-[2px] border-[#172052] px-[20px] py-[5px] text-[16px] text-[#172052] font-[500] rounded manrope">
                {totalQuestion} Generated
              </button>
            )}
          </div>
          {openGenerate && (
            <>
              <GeneratedQuestins key={responseKey} trade_id={formik.values.trade_id} setTotalQuestion={setTotalQuestion} textResponse={textResponse} imgResponse={imgResponse} />
            </>
          )}
        </form>
      </Box>
    </div>
  );
};

export default Poc;
