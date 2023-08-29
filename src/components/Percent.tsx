import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type props = {
    sum: number;
    days: number;
};

const Percent = ({ sum, days }: props) => {
    const rows = [];

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const millisecondsInDay = 24 * 60 * 60 * 1000;

    for (let i = 0; i < days; i++) {
        const currentDate = new Date(startDate.getTime() + i * millisecondsInDay);
        
        const percent = sum * (i + 1) * 0.01;

        rows.push(
            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='left'>{currentDate.toLocaleDateString()}</TableCell>
                <TableCell>{sum} + {percent}</TableCell>
            </TableRow>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>Дней</TableCell>
                        <TableCell>Сумма к возврату</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{rows}</TableBody>
            </Table>
        </TableContainer>
    );
};

export default Percent;