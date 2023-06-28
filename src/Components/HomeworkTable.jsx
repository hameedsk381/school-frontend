import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import REACT_API_URL from "../config";

const HomeworkTable = ({ classname, section }) => {
  const [homeworkByClassSection, setHomeworkByClassSection] = useState([]);

  useEffect(() => {
    const fetchHomeworkDataByClassSection = async () => {
      try {
        const response = await axios.get(`${REACT_API_URL}/homework/${classname}/${section}`);
        const { homework } = response.data;
        setHomeworkByClassSection(homework);
      } catch (error) {
        console.error('Failed to fetch homework data:', error);
      }
    };

    fetchHomeworkDataByClassSection();
  }, [classname, section]);

  const memoizedHomework = useMemo(() => homeworkByClassSection, [homeworkByClassSection]);

  return (
    <TableContainer component={Paper} elevation={3} sx={{ p: { xs: 0, lg: 2 }, bgcolor: 'white' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontSize: { xs: 13, lg: 20, color: '#2196f3' } }}
              variant="head"
            >
              Subject
            </TableCell>
            <TableCell
              sx={{ fontSize: { xs: 13, lg: 20, color: '#2196f3' } }}
              align="left"
              variant="head"
            >
              Homework
            </TableCell>
            <TableCell
              sx={{ fontSize: { xs: 13, lg: 20, color: '#2196f3' } }}
              align="left"
              variant="head"
            >
              Teacher
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {memoizedHomework.map((row) => (
            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{ fontWeight: "bold", fontSize: { xs: 14, md: 16, lg: 18 }, textTransform: "capitalize"}}>
                {row.subject || '------------------'}
              </TableCell>
              <TableCell align="left"   >
                <Typography sx={{ fontSize: { xs: 12, md: 14, lg: 16 }, textTransform: "capitalize" }}>{row.description || 'No homework for today'}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography color={'Highlight'} sx={{ fontSize: { xs: 10, md: 12, lg: 14 }, textTransform: "capitalize" }}>Note :  {row.note || '-'}</Typography>
              </TableCell>
              <TableCell align="left"   >{row.regId || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HomeworkTable;
