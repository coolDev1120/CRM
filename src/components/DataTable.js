import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  styled,
} from "@mui/material";

const CustomTable = styled(Table)(({ theme }) => ({
  border: "none",
}));

const DataTable = ({ rows }) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none", margin: '0px' }}>
      <CustomTable>
        <TableBody>
          {rows.map((row, index) => {
            return (
              <TableRow key={index}>
                {Object.keys(row).map((k, id) => {
                  return <TableCell key={`${index}-${id}`}>{row[k]}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </CustomTable>
    </TableContainer>
  );
};

export default DataTable;
