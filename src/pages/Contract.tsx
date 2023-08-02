import { useParams } from "react-router-dom";
import { useGetContractQuery, useToggleIssuedFalseToTrueMutation } from "../store/TicketReducer/ticketApi"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";
import { userApi } from "../store/userReducer/userApi";
import { useEffect } from "react";


const Contract = () => {
    const { id } = useParams();
    const parsedId = id ? parseInt(id, 10) : undefined


    const { data: contract } = useGetContractQuery(parsedId);
    const { data: userData } = userApi.useGetUserInformationQuery('');

    const [toggleToTrue, {isSuccess: toggleToTrueIsSuccess}] = useToggleIssuedFalseToTrueMutation();

    const handleClick = () => {
        toggleToTrue(parsedId)
        print()
    }

    useEffect(() => {
        if (toggleToTrueIsSuccess) {
            alert("success")
        }
    }, [toggleToTrueIsSuccess])



    return (
        <div >
            <Box sx={{ flexGrow: 1, marginBottom: 3 }} className="hide-on-print">
                <AppBar position="static">
                    <Toolbar>
                        <Button variant="contained" color="warning" sx={{ marginRight: 4 }} onClick={() => alert("в разработке")}>
                            Send SMS
                        </Button>
                        <Button variant="contained" color="error" onClick={handleClick}>
                            Print
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>


            <div className="centered-content">
                <h2>ДОГОВОР ХРАНЕНИЯ</h2>
                <h4>вещей в ломбарде</h4>

                <h4>
                    АКТИВ ЛОМБАРД в лице "THE BEST SELLER"
                </h4>

                <h4>Д-532 действующего на основании {userData?.username}, именуемый в дальнейшем Ломбард",</h4>

                <h4>с одной стороны, и гр. {contract?.client.fullname}, серия паспорта: {contract?.client.passNumber},</h4>

                <h4>
                    выданной МВД.РК, проживающий по адресу {contract?.client.address} , именуемый в дальнейшем «Клиент», с другой стороны,
                </h4>
                <h4>
                    именуемые в дальнейшем «Стороны», заключили настоящий договор, в дальнейшем «Договор», о нижеследующем:
                </h4>

                <p>
                    1. По настоящему договору Ломбард обязуется хранить вещь, переданную ему Клиентом, и возвратить эту вещь в сохранности.
                </p>
                <p>
                    2. На хранение в Ломбард сдается: {contract?.product.model}
                </p>
                <p>
                    3. Заключение настоящего договора удостоверяется выдачей Клиенту именной сохранной квитанции.
                </p>
                <p>
                    4. Вещь, сдаваемая на хранение, оценена сторонами в установленном порядке в тенге.
                </p>
                <p>
                    5. Ломбард обязан страховать в пользу Клиента за свой счет принятую на хранение вещь в полной сумме ее оценки, указанной в п.4.
                </p>
                <p>
                    6. Настоящий договор заключен на срок «{contract?.product.days}» дней.
                </p>

                    <h2>Описание товара</h2>
                <Box sx={{border: 1, color: "black", maxWidth: "600px", textAlign: "center", margin: "0 auto"}}>
                    <p>Модель: {contract?.product.model} {contract?.product.memory},
                    IMEI: {contract?.product.imei}, {contract?.product.packaging ? "в оригинальной коробке" : "Нету оригинальной коробки"}
                    <br></br>
                     {contract?.product.description}</p>
                    
                </Box>
                <h2>ПОДПИСИ СТОРОН</h2>

                <div className="row">
                    <h3>{contract?.client.fullname}___________</h3>
                    <h3>{userData?.username}________</h3>
                </div>
            </div>

        </div>
    )
}

export default Contract