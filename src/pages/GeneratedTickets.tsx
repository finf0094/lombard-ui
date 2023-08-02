import { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDeleteFormedContractMutation, useGetFormedContractsQuery } from '../store/TicketReducer/ticketApi';
import { useNavigate } from 'react-router-dom';

export default function GeneratedTickets() {
  const navigate = useNavigate();
  const { data: formedContracts } = useGetFormedContractsQuery(2);

  const [deleteFormedContract, { isSuccess }] = useDeleteFormedContractMutation();

  useEffect(() => {
    if (isSuccess) {
      alert("Успешно удалено")
    }
  }, [isSuccess, deleteFormedContract])

  const handleClick = (id: number) => {
    navigate("/contract/" + id)
  }

  return (
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
          {formedContracts?.map((formedContract) => (
            <TableRow
              key={formedContract.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>
                <Button variant='contained' color='success' onClick={() => handleClick(formedContract.id)}>41-{formedContract.id}</Button>
              </TableCell>
              <TableCell component="th" scope="row">
                {formedContract.client?.fullname}
              </TableCell>
              <TableCell align="right">{formedContract.product?.model}</TableCell>
              <TableCell align="right">{formedContract.client?.phone_number}</TableCell>
              <TableCell align="right">
                <Button variant='contained' color='error' onClick={() => deleteFormedContract(formedContract.id)}>DELETE</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}