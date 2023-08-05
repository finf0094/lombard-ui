import { TextField } from "@mui/material";
import { FC, useState, ChangeEvent } from "react";
import { useGetContractByClientIinQuery } from "../store/TicketReducer/ticketApi";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Contracts: FC = () => {
  const [search, setSearch] = useState("");
  const [isEnterPressed, setIsEnterPressed] = useState(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const { data: contracts } = useGetContractByClientIinQuery(isEnterPressed ? search : '');


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEnterPressed(true);
    } else {
      setIsEnterPressed(false);
    }
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="search"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Contract id</TableCell>
              <TableCell component="th" scope="row">Contract Name</TableCell>
              <TableCell align="right">Product Model</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts?.map((formedContract) => (
              <TableRow
                key={formedContract.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='left'>
                  <Button variant='contained' color='success' >41-{formedContract.id}</Button>
                </TableCell>
                <TableCell component="th" scope="row">
                  {formedContract.client?.fullname}
                </TableCell>
                <TableCell align="right">{formedContract.product?.model}</TableCell>
                <TableCell align="right">{formedContract.client?.phone_number}</TableCell>
                <TableCell align="right">
                  <Button variant='contained' color='error' >DELETE</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Contracts;




