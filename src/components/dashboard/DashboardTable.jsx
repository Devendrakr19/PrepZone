import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F5F7F8',
    color: '#000000',
    fontWeight: '400',
    fontSize: '16px',
    border: 'none',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: 'none',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#FFFFFF', // Odd row background
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#F5F7F8', // Even row background
  },
  '& td, & th': {
    border: 'none',
    padding: '15px',
    color: '#666666',
    fontWeight: '400',
    fontSize: '16px',
  },
}));

function createData(sector, trade, l1, l2, l3, dateTime) {
  return { sector, trade, l1, l2, l3, dateTime };
}

const rows = [
  createData('Aerospace & Aviation', 'Drone Pilot (Junior)', 20, 87, 20, '05/17/24 12:29:30'),
  createData('Agriculture', 'Floriculture & Landscaping', 54, 20, 54, '05/16/24 15:39:17'),
  createData('Agriculture', 'Horticulture', 30, 65, 30, '15/11/24 10:14:15'),
  createData('Agriculture', 'Soil Testing and Crop Technician', 10, 48, 10, '29/09/24 02:17:17'),
  createData('Apparel', 'Cutting & Sewing (VI & OD)', 20, 87, 20, '15/08/24 18:18:18'),
  createData('Automotive', 'Dress Making', 54, 20, 54, '05/17/24 12:29:30'),
  createData('Beauty & Wellness', 'Sewing Technology', 30, 78, 57, '05/16/24 15:39:17'),
  createData('Aerospace & Aviation', 'Drone Pilot (Junior)', 20, 87, 20, '05/17/24 12:29:30'),
  createData('Agriculture', 'Floriculture & Landscaping', 54, 20, 54, '05/16/24 15:39:17'),
  createData('Agriculture', 'Horticulture', 30, 65, 30, '15/11/24 10:14:15'),
  createData('Agriculture', 'Soil Testing and Crop Technician', 10, 48, 10, '29/09/24 02:17:17'),
  createData('Apparel', 'Cutting & Sewing (VI & OD)', 20, 87, 20, '15/08/24 18:18:18'),
  createData('Automotive', 'Dress Making', 54, 20, 54, '05/17/24 12:29:30'),
  createData('Beauty & Wellness', 'Sewing Technology', 30, 78, 57, '05/16/24 15:39:17'),
];

const DashboardTable = () => {
  return (
    <div className='bg-white p-[20px] shadow mt-[20px]'>
      <div className='text-[17px] font-[600] text-[#545454] manrope mb-[10px]'>
        Questions Bank Details
      </div>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table sx={{ minWidth: 700, borderCollapse: 'separate', borderSpacing: 0 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sector name</StyledTableCell>
              <StyledTableCell align="left">Name of Trade</StyledTableCell>
              <StyledTableCell align="right">L1 Questions</StyledTableCell>
              <StyledTableCell align="right">L2 Questions</StyledTableCell>
              <StyledTableCell align="right">L3 Questions</StyledTableCell>
              <StyledTableCell align="right">Last Date & Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{row.sector}</StyledTableCell>
                <StyledTableCell align="left">{row.trade}</StyledTableCell>
                <StyledTableCell align="center">{row.l1}</StyledTableCell>
                <StyledTableCell align="center">{row.l2}</StyledTableCell>
                <StyledTableCell align="center">{row.l3}</StyledTableCell>
                <StyledTableCell align="right">{row.dateTime}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DashboardTable;