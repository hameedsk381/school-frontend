import { useState } from "react";
import { Button, Container, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import * as XLSX from "xlsx";

function XlsToJsonTable() {
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const json = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      setData(json);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <Container>
      <Input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />

      {data.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {data[0].map((header, index) => (
                  <TableCell key={index}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(1).map((row, index) => (
                <TableRow key={index}>
                  {row.map((cell, index) => (
                    <TableCell key={index}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default XlsToJsonTable;
