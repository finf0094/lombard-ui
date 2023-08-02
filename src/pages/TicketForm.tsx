import { Box, Button, Grid, MenuItem, TextField, Toolbar, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Divider from '@mui/material/Divider';
import { CustomerFormData, ProductFormData } from "../types/Contract.types";
import { setCustomer, setProduct } from "../store/TicketReducer/ticketSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useCreateTicketMutation } from "../store/TicketReducer/ticketApi";
import { useNavigate } from "react-router-dom";



const CustomerForm: React.FC = () => {

    const dispatch = useAppDispatch();

    const { handleSubmit, register, formState: { errors } } = useForm<CustomerFormData>();

    const onSubmit = (CustomerData: CustomerFormData) => {
        dispatch(setCustomer(CustomerData));
    }

    return (
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
            <Typography variant='h6'>Анкета залогодателя</Typography>
            <Divider />

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, width: '100%', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)', textAlign: 'center' }}>
                    <Typography variant="h6" color="white">Данные о клиенте</Typography>
                </Toolbar>
                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                    <Grid item xs={12} sm={4}>
                        <TextField label="IIN" fullWidth {...register("iin", { required: true, minLength: 12, maxLength: 12, pattern: /^[0-9]+$/ })} />
                        {errors.iin && <span>IIN должен состоять из 15 цифр</span>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Full Name" fullWidth {...register("fullname", { required: true })} />
                        {errors.fullname && <span>Поле обязательно для заполнения</span>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Passport Number" fullWidth {...register("passNumber", { required: true })} />
                        {errors.passNumber && <span>Поле обязательно для заполнения</span>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Phone Number" fullWidth {...register("phone_number", { required: true, pattern: /^\+?[0-9]{11,12}$/ })} />
                        {errors.phone_number && <span>Номер телефона должен быть в формате +XXXXXXXXXXX или XXXXXXXXXXX</span>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="City" fullWidth {...register("city", { required: true })} />
                        {errors.city && <span>Поле обязательно для заполнения</span>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Address" fullWidth {...register("address", { required: true })} />
                        {errors.address && <span>Поле обязательно для заполнения</span>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Birth Date" type="date" fullWidth {...register("birthDate", { required: true })} InputLabelProps={{ shrink: true }} />
                        {errors.birthDate && <span>Поле обязательно для заполнения</span>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Date of Issue" type="date" fullWidth {...register("dateOfIssue", { required: true })} InputLabelProps={{ shrink: true }} />
                        {errors.dateOfIssue && <span>Поле обязательно для заполнения</span>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Email" fullWidth {...register("email", { pattern: /^\S+@\S+.\S+$/ })} />
                        {errors.email && <span>Некорректный адрес электронной почты</span>}
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" color="primary" type="submit">Добавить в базу клиента</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

const ProductForm: React.FC = () => {
    const dispatch = useAppDispatch();

    const { handleSubmit, register, formState: { errors } } = useForm<ProductFormData>();

    const handleProductSubmit = (productData: ProductFormData) => {
        dispatch(setProduct(productData));
    };

    const {sum} = useAppSelector((state: RootState) => state.ticket.product);

    
    return (
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, width: '100%', background: 'radial-gradient(circle, rgba(255,0,228,1) 0%, rgba(0,108,255,1) 100%)', textAlign: 'center' }}>
                <Typography variant="h6" color="white">Данные о товаре</Typography>
            </Toolbar>
            <form onSubmit={handleSubmit(handleProductSubmit)} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Состояние" fullWidth {...register("condition", { required: true })} select >
                            <MenuItem value='Б/У'>Б/У</MenuItem>
                            <MenuItem value='новый'>новый</MenuItem>
                        </TextField >
                        {errors.condition && <span>Поле обязательно для заполнения</span>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Тип товара" fullWidth {...register("productType", { required: true })} />
                        {errors.productType && <span>Поле обязательно для заполнения</span>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Категория" fullWidth {...register("category", { required: true })} />
                        {errors.category && <span>Поле обязательно для заполнения</span>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Модель" fullWidth {...register("model", { required: true })} />
                        {errors.model && <span>Поле обязательно для заполнения</span>}
                    </Grid><Grid item xs={12} sm={4}>
                        <TextField
                            label="Объем памяти"
                            fullWidth
                            {...register("memory")}
                            select
                        >
                            <MenuItem value="4gb">4GB</MenuItem>
                            <MenuItem value="8gb">8GB</MenuItem>
                            <MenuItem value="16gb">16GB</MenuItem>
                            <MenuItem value="32gb">32GB</MenuItem>
                            <MenuItem value="64gb">64GB</MenuItem>
                            <MenuItem value="128gb">128GB</MenuItem>
                            <MenuItem value="256gb">256GB</MenuItem>
                            <MenuItem value="512gb">512GB</MenuItem>
                            <MenuItem value="1tb">1TB</MenuItem>
                        </TextField>
                        {errors.memory && <span>Поле обязательно для заполнения</span>}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Наличие упаковки"
                            fullWidth
                            {...register("packaging", { required: true })}
                            select
                        >
                            <MenuItem value="true">В коробке</MenuItem>
                            <MenuItem value="false">Нету коробки</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Серийный номер" fullWidth {...register("serialNumber")} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="IMEI" fullWidth {...register("imei")} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField label="Описание" fullWidth multiline rows={4} {...register("description")} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Срок" fullWidth {...register("days")} select>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                            <MenuItem value="7">7</MenuItem>
                            <MenuItem value="no return">Без выкупа</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Сумма" fullWidth {...register("sum")} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField label="Подтверждение суммы" fullWidth {...register("confirmSum")} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" color="primary" type="submit">
                            Добавить в базу товар
                        </Button>
                        {sum ? <h2>{sum}</h2> : ''}
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

const TicketForm: React.FC = () => {
    const navigate = useNavigate();
    const { ticket } = useAppSelector((state: RootState) => state);
  
    const [createTicketMutation, {isSuccess: isTicketAddSuccess, isError: isTicketAddError}] = useCreateTicketMutation(); 
  
    const handleCreateTicket = () => {
      createTicketMutation(ticket) 
    };
    
    useEffect(() => {
      if (isTicketAddSuccess) {
        navigate("/generated")
      }
    }, [isTicketAddSuccess, navigate]);
  
    return (
      <div>
        <CustomerForm />
        <ProductForm />
        <button onClick={handleCreateTicket}>оформить</button>

        {isTicketAddError ? <h2>Ошибка попробуйте снова</h2>: ""}
      </div>
    );
  };

export default TicketForm;
