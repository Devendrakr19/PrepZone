import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import AddIcon from "@mui/icons-material/Add"; 
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl"; 
import {
  tradeLists,
  questionsLists,
} from "../../redux/slice/QuestionBankSlice";
import QuestionCreationTypePopup from "./QuestionCreationTypePopup";
import { CircularProgress } from "@mui/material";

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

const QuestionsBank = () => {
  const dispatch = useDispatch();
  const {
    tradeListsData,
    questionsListsLoading,
  } = useSelector((state) => state.questionBank);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  // const [selectedValue, setSelectedValue] = useState('all');
  const [selectedTrade, setSelectedTrade] = useState("all");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false); 

  useEffect(() => {
    dispatch(tradeLists());
    // dispatch(questionsLists());
  }, [dispatch]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await dispatch(
        questionsLists({
          page: page + 1,
          page_size: rowsPerPage,
          trade_id: selectedTrade === "all" ? "" : selectedTrade,
        })
      );
      if (response.payload) {
        setQuestions(response.payload.results);
        setTotalCount(response.payload.count);
      }
    };
    fetchQuestions();
  }, [dispatch, page, rowsPerPage, selectedTrade]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedTrade(value);
  };

  const showImage = (img) => {
    if (img) {
      window.open(img, '_blank');
    }
  };
  

  return (
    <div className="bg-white p-[20px] shadow mt-[20px] h-[calc(100vh_-_118px)]">
      <div className="flex justify-between items-center mb-[20px]">
        <div className="text-[17px] font-[600] text-[#545454] manrope mb-[10px]">
          Questions Bank Details
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
              {tradeListsData?.data?.map((trade) => (
                <MenuItem key={trade.id} value={trade.id}>
                  {trade.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button
            onClick={handleOpen}
            className="cursor-pointer bg-[#172052] text-[#ffff] px-[20px] py-[5px] text-[18px] manrope rounded"
          >
            <AddIcon /> Add
          </button>
        </div>
      </div>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          overflowX: "auto",
          height: "calc(100vh - 250px)",
        }}
      >
        <Table sx={{ minWidth: 1200 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Question</StyledTableCell>
              <StyledTableCell align="left">Image</StyledTableCell>
              <StyledTableCell align="left">Option (A)</StyledTableCell>
              <StyledTableCell align="left">Option (B)</StyledTableCell>
              <StyledTableCell align="left">Option (C)</StyledTableCell>
              <StyledTableCell align="left">Option (D)</StyledTableCell>
              <StyledTableCell align="left">Answer</StyledTableCell>
              <StyledTableCell align="left">Difficulty</StyledTableCell>
              <StyledTableCell align="right">Created At</StyledTableCell>
            </TableRow>
          </TableHead>
          {questionsListsLoading ? (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={9}
                  style={{
                    height: "300px",
                    textAlign: "center",
                    verticalAlign: "middle",
                    border:"none"
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {questions?.length > 0 ? (
                questions.map((row, index) => (
                  <TableRow key={index}>
                    <StyledTableCell>{row.text}</StyledTableCell>
                    <StyledTableCell align="left" onClick={() => showImage(row?.image)} style={{ cursor: 'pointer'}}>
                      {row.image ? "View Image" : "NA"}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.choices[0]?.text || "N/A"}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.choices[1]?.text || "N/A"}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.choices[2]?.text || "N/A"}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.choices[3]?.text || "N/A"}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.answers[0]?.choice_text || "N/A"}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.level_of_difficulty}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {new Date(row.created_at).toLocaleString()}
                    </StyledTableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    align="center"
                    style={{ 
                      border:"none"
                    }}
                    sx={{ py: 3, fontSize: 16, color: "#666" }}
                  >
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <QuestionCreationTypePopup open={open} handleClose={handleClose} />
    </div>
  );
};

export default QuestionsBank;
