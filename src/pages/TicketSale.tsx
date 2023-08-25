import { Grid, Button, Typography } from "@mui/material"
import { useGetContractQuery } from "../store/TicketReducer/ticketApi";
import { useParams } from "react-router-dom";

const TicketSale = () => {
    const { id } = useParams();
    const parsedId = id ? parseInt(id, 10) : undefined


    const { data: contract } = useGetContractQuery(parsedId !== undefined ? parsedId : 0);



    return (
        <Grid container spacing={2} sx={{margin: 1}}>
            <Grid item xs={6} md={8}>
                <Typography variant="h4" >
                   Имя Клиента: {contract?.client.fullname}
                </Typography>
                <Typography variant="h6">
                    Товар: {contract?.product.model} {contract?.product.memory}
                </Typography>
                <Typography variant="h6">оплачивая {contract?.product.sumToBuyout} тг свой забирает товар</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
                <Button variant="contained" color="success" sx={{ width: '80%', marginTop: "10%" }}>Возврат</Button>
            </Grid>
        </Grid>

    )
}

export default TicketSale;