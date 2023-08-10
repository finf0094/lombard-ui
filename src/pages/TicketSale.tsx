import { Grid } from "@mui/material"
import { useGetContractQuery } from "../store/TicketReducer/ticketApi";
import { useParams } from "react-router-dom";

const TicketSale = () => {
    const { id } = useParams();
    const parsedId = id ? parseInt(id, 10) : undefined


    const { data: contract } = useGetContractQuery(parsedId !== undefined ? parsedId : 0);


    
    return (
        <Grid>





        </Grid>
    )
}

export default TicketSale;