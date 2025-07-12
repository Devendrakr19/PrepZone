import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import {
  FormControl,
  Select,
  MenuItem,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  curruculumListSlice,
  sectorListSlice,
} from "../../redux/slice/CurriculumSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F5F7F8",
    color: "#000000",
    fontWeight: "400",
    fontSize: "16px",
    border: "none",
    whiteSpace: "nowrap",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "none",
    whiteSpace: "nowrap",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: "#FFFFFF" },
  "&:nth-of-type(even)": { backgroundColor: "#F5F7F8" },
  "& td, & th": {
    border: "none",
    padding: "15px",
    color: "#666666",
    fontWeight: "400",
    fontSize: "16px",
    whiteSpace: "nowrap",
  },
}));

const curriculumUpdates = [
  {
    trade: "Electrical Engineering",
    update: "Added new safety protocols",
    eBook: "Electrical Basics.pdf",
  },
  {
    trade: "Mechanical Engineering",
    update: "Updated thermodynamics module",
    eBook: "ThermoGuide.pdf",
  },
  {
    trade: "Computer Science",
    update: "Introduced AI & ML fundamentals",
    eBook: "AI_Intro.pdf",
  },
  {
    trade: "Civil Engineering",
    update: "Improved structural analysis methods",
    eBook: "Structures101.pdf",
  },
  {
    trade: "Automobile Engineering",
    update: "Enhanced hybrid vehicle course",
    eBook: "HybridCars.pdf",
  },
];

const CurriculumList = () => {
  const dispatch = useDispatch();
  const tradesDropdown =useSelector((state) => state?.curriculum?.sectorListData?.data) || [];
  const curriculumList =useSelector((state) => state?.curriculum?.curruculumListData?.data) || [];
  const curriculumListLoading = useSelector((state) => state?.curriculum?.curruculumListLoading);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTrade, setSelectedTrade] = useState("all");
  // console.log("curriculumList", curriculumList);

  const handleSelectChange = (event) => {
    setSelectedTrade(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(sectorListSlice());
    dispatch(curruculumListSlice());
  }, [dispatch]);

  const handleCurriculumDownload = (curriculum_file) => {
    window.open(curriculum_file, "_blank")
 
  };
  const handleeBookDownload = (ebook_file) => {
    console.log("ebook_file", ebook_file);
    window.open(ebook_file, "_blank") 
  };

  return (
    <div className="bg-white p-[20px] shadow mt-[20px]">
      <div className="flex justify-between items-center mb-[20px]">
        <div className="text-[17px] font-[600] text-[#545454] manrope mb-[10px]">
          Curriculum Updates
        </div>
        <div className="flex gap-[20px]">
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedTrade}
              onChange={handleSelectChange}
              sx={{
                borderRadius: "5px",
                fontSize: "18px",
                color: "#545454",
                height: 40,
                fontFamily: "Manrope, sans-serif",
              }}
            >
              <MenuItem value="all">All</MenuItem>
              {tradesDropdown.map((trade) => (
                <MenuItem key={trade.id} value={trade.id}>
                  {trade.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <NavLink to="/curriculum/curriculumupdates">
            <button className="cursor-pointer bg-[#172052] text-[#ffff] px-[20px] py-[5px] text-[18px] manrope rounded">
              <AddIcon /> Add
            </button>
          </NavLink>
        </div>
      </div>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "none", overflowX: "auto" }}
      >
        <Table sx={{ minWidth: 1200 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name of Trade</StyledTableCell>
              <StyledTableCell align="left">Curriculum Updates</StyledTableCell>
              <StyledTableCell align="left">EBooks</StyledTableCell>
              {/* <StyledTableCell align="left">Action</StyledTableCell> */}
            </TableRow>
          </TableHead>
          {curriculumListLoading ? (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  style={{ height: "300px" }}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : curriculumList.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <h1>No Data Found</h1>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {curriculumList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{row?.name || "N/A"}</StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className="cursor-pointer"
                      onClick={() => handleCurriculumDownload(row?.curriculum_file)}
                      >
                      {row?.curriculum_file_name || "N/A"}
                    </StyledTableCell>
                    <StyledTableCell align="left"
                      className="cursor-pointer"
                      onClick={() => handleeBookDownload(row?.ebook_file)}
                    >
                      {row.ebook_file_name || "N/A"}
                    </StyledTableCell>
                    {/* <StyledTableCell align="left" sx={{ border: "#000" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "36px",
                          height: "36px",
                          border: "1px solid #000",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        <ModeEditOutlineOutlinedIcon
                          style={{ color: "#666666" }}
                        />
                      </div>
                    </StyledTableCell> */}
                  </StyledTableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={curriculumUpdates.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CurriculumList;
