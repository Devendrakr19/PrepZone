import { Box, TextField, MenuItem, Select } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { CreateCurruculumSlice, sectorListSlice } from "../../redux/slice/CurriculumSlice";
import { PoctradeListSlice, tradeLists } from "../../redux/slice/QuestionBankSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CurriculumUpdates = () => {
  const tradesDropdown = useSelector((state) => state?.curriculum?.sectorListData?.data) || [];  
  const {PoctradeListData} = useSelector((state) => state?.questionBank);
  const loading = useSelector((state) => state?.curriculum?.CreateCurruculumLoading);
  console.log("loading", loading);
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState('');
  const curriculumInputRef = useRef(null);
  const ebookInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [sectorId, setSectorId] = useState("");
  

  // console.log("file", file);
  // console.log("uploadedFile", uploadedFile);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedTrade(value);
    setSectorId(value); 
  };
  useEffect(() => {
    dispatch(sectorListSlice());
    // dispatch(tradeLists());
  }, [dispatch]);

  useEffect(() => { 
      if(sectorId){
        dispatch(PoctradeListSlice(sectorId));
      }
    }, [dispatch, sectorId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && ["application/pdf"].includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert("Only PDF files are allowed.");
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

  // Multiple file upload
  const handleFileChangeEbook = (e) => {
    const newFiles = Array.from(e.target.files);
    const validFiles = newFiles.filter((file) =>
      ["application/pdf"].includes(file.type)
    );

    if (validFiles.length !== newFiles.length) {
      alert("Only PDF files are allowed.");
    }

    setUploadedFile((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDropEbook = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setUploadedFile((prevFiles) => [...prevFiles, ...droppedFiles]);
  };
  const handleRemoveFileEbook = (index) => {
    setUploadedFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const formik = useFormik({
    initialValues: {
      trade_id: "",
      trade_name:"",
    },
    onSubmit:async (values) => {
      const formData = new FormData();
      formData.append("trade", values.trade_id);
      formData.append("name", values.trade_name);
      formData.append("curriculum_file", file);
      formData.append("ebook_file", uploadedFile[0]); 


      try {
        await dispatch(CreateCurruculumSlice(formData)).unwrap();
        toast.success("Curriculum created successfully!");
        navigate("/curriculum")
        formik.resetForm();
        setFile(null);
        setUploadedFile([]);
      } catch (error) {
        console.error("Error creating curriculum:", error);
        alert("Failed to create curriculum.");
      }
    }
  })

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
        sx={{ backgroundColor: "#fff", p: 2, borderRadius: 2 }}
        className="manrope h-auto"
      >
        <h2 className="text-[16px] xxl:text-[18px] 2xl:text-[20px] font-[600] text-[#545454] mb-[20px] manrope">
          Curriculum Create
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <label className="text-[16px] font-[500] text-[#545454] roboto">
                Sector Name
              </label>
              <Select fullWidth sx={{ mt: "8px", height: 40 }} value={selectedTrade}
                onChange={handleSelectChange} name="difficulty">
                {/* <MenuItem value="all">All</MenuItem> */}
                {tradesDropdown.map((trade) => (
                  <MenuItem key={trade.id} value={trade.id}>
                    {trade.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <label className="text-[16px] font-[500] text-[#545454] roboto">
                Trade Name
              </label>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="trade_id"
                value={formik.values.trade_id}
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
            </Grid>
          </Grid>
          <Grid container rowSpacing={3}>
            <div className="bg-[#F8F8FF] px-[20px] py-[15px] mt-[20px] w-[100%]">
              <Grid item size={{ xs: 12, sm: 12 }}>
                <label className="text-[16px] font-[500] text-[#545454] roboto">
                  Curriculum
                </label>
                {!file && (<Box
                  onDragEnter={!file ? handleDrag : undefined}
                  onDragOver={!file ? handleDrag : undefined}
                  onDragLeave={!file ? handleDrag : undefined}
                  onDrop={!file ? handleDrop : undefined}
                  className="modal_shadow w-full relative"
                  sx={{
                    // border: dragActive ? '' : '',
                    borderRadius: 2,
                    // height: '100%',
                    minHeight: 250,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                    overflow: "hidden",
                    marginTop: "10px"
                  }}
                  onClick={() => {
                    if (!file) curriculumInputRef.current.click();
                  }}
                >
                  <input
                    ref={curriculumInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="upload-file"
                    disabled={!!file}
                  />
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
                      Support only PDF
                    </p>
                  </>
                </Box>
                )}
                {file && (
                  <div className="relative">
                    <div className="w-[100%] flex items-center gap-[5px] px-[5px] py-[10px] bg-[#ffffff] rounded mt-[10px] border-[1px] border-[#BBBBBB]">
                      <img src="/pdf_icon.png" alt="" className="w-[20px]" />
                      <span>{file?.name}</span>
                    </div>
                    {file && (
                      <div
                        className="absolute flex justify-center items-center right-[10px] top-[7px] cursor-pointer rounded px-[3px] py-[4px]"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile();
                        }}
                      >
                        <DeleteOutlineIcon style={{ fontSize: "22px" }} className="text-[red]" />
                      </div>
                    )}
                  </div>
                )}
              </Grid>
            </div>

            <div className="bg-[#F8F8FF] px-[20px] w-[100%] pt-[15px]">
              <Grid item size={{ xs: 12, sm: 12 }}>
                <label className="text-[16px] font-[500] text-[#545454] roboto">
                  EBook
                </label>

                {uploadedFile.length < 1 && ( 
                <Box
                  onDragEnter={(e) => e.preventDefault()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDropEbook}
                  className="modal_shadow w-full relative"
                  sx={{
                    // border: dragActive ? '' : '',
                    borderRadius: 2,
                    minHeight: 250,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                    overflow: "hidden",
                    marginTop: "10px"
                  }}
                  onClick={() => ebookInputRef.current.click()}
                >
                  <input
                    ref={ebookInputRef}
                    type="file"
                    // multiple
                    accept=".pdf"
                    onChange={handleFileChangeEbook}
                    style={{ display: "none" }}
                    id="upload-ebook"
                  />
                  <img
                    src="/upload.svg"
                    alt="Upload Icon"
                    width="100"
                    style={{ marginBottom: "10px" }}
                  />
                  <p>Choose a file or Drag it here.</p>
                  <p className="text-[16px] font-[500] text-[#A4A4A4] mt-[30px] manrope">
                    Support only PDF
                  </p>
                </Box>
                )}
                <div className="mt-[20px]">
                  {uploadedFile.length > 0 &&
                    uploadedFile.map((file, index) => (
                      <div key={index} className="relative w-[100%] mb-[10px]">
                        {/* Remove Button */}
                        <div
                          className="absolute right-[10px] top-[9px] cursor-pointer rounded px-[4px]"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFileEbook(index);
                          }}
                        >
                          <DeleteOutlineIcon style={{ fontSize: "22px" }} className="text-[red]" />
                        </div>

                        {/* Image Preview */}
                        <div className="w-[100%] bg-[#fff] flex items-center gap-[5px] pl-[13px] py-[10px] border-[1px] border-[#BBBBBB] rounded mt-[2px]">
                          <img
                            src="/pdf_icon.png"
                            alt=""
                            className="w-[20px]"
                          />
                          <span>{file?.name}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </Grid>
            </div>
          </Grid>
          <div className="flex gap-[20px] mt-[20px]">
            <button type="button" className="cursor-pointer border-[2px] border-[#172052] px-[20px] py-[5px] text-[16px] text-[#172052] font-[500] rounded manrope"
            onClick={() =>{formik.resetForm, setFile(null),
              setUploadedFile([])}}>
              Cancel
            </button>
            <button
              className="cursor-pointer border-[2px] border-[#172052] bg-[#172052] px-[30px] py-[5px] text-[16px] text-[#ffff] font-[500] rounded manrope"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default CurriculumUpdates;
