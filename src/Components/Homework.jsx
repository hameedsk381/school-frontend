import { Box, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const Homework = () => {
  return (
  <Grid container  spacing={2}>
 {[1,2,3,4,5,6,7,8,9,10].map(item=>(
  <Grid item xs={12} md={6} key={item}  >
  <Paper variant='outlined' sx={{border:"1px solid #2196f3",m:3,pt:2,bgcolor:"Highlight",color:"HighlightText"}}>
   
  <Typography  sx={{mx:3,color:"white",fontSize:{xs:15,lg:19}}}>CLASS - {item} <Divider orientation='vertical' sx={{ border: "1px solid #2196f3",mx:1 ,display:"inline"}} />  SECTION - A</Typography>
  <Divider sx={{ border: "1px solid white",mt:1 }} />
<BasicTable/>
  </Paper>
  </Grid>
 ))}
  </Grid>
  )
}
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('English', 159),
  createData('Telugu', 237),
  createData('Hindi', 262),
  createData('Maths', 305),
  createData('Science', 356),
];

export  function BasicTable() {
  return (
    <TableContainer   component={Box} sx={{p:{xs:0,lg:2},bgcolor:"white",}}>
      <Table  >
        <TableHead>
          <TableRow>
            <TableCell sx={{fontSize:{xs:13,lg:20,color:"#2196f3"}}} variant='head'>Subject</TableCell>
            <TableCell sx={{fontSize:{xs:13,lg:20,color:"#2196f3"}}} align="left" variant='head'>Home work</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Homework