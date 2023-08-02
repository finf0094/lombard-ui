import { FC, useEffect, useState } from "react";
import { Avatar, Grid, Paper, TextField, Button, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../store/authReducer/authApi";
import { setUser } from "../store/authReducer/authSlice";
import { useAppDispatch } from "../hooks/hooks";


const Auth: FC = () => {
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  });

  const [loginUserMutation, { data: loginMutatuonResultData, isSuccess, isLoading, isError }] = useLoginUserMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  if (isError) {
    console.log("Произошла ошибка при аутентификаций")
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(loginMutatuonResultData));
      navigate("/dashboard");
    }
  }, [isSuccess, dispatch, loginMutatuonResultData, navigate])

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    loginUserMutation(loginFormData);
  }



  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle} >
        <Grid alignContent='center'>
          <Avatar style={{ backgroundColor: '#268b17' }}><LockOutlinedIcon /></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <Grid style={{ display: "flex", flexDirection: 'column', gap: 10 }}>
          <TextField variant="standard"
            label='Username'
            placeholder="Enter Username"
            value={loginFormData.username}
            onChange={e => setLoginFormData({ ...loginFormData, username: e.target.value })}
            fullWidth required />

          <TextField variant="standard"
            label='Password'
            placeholder="Enter Password"
            type="password"
            value={loginFormData.password}
            onChange={e => setLoginFormData({ ...loginFormData, password: e.target.value })}
            fullWidth required />

          <Button variant="contained" onClick={handleChange} fullWidth>Sign In</Button>

          {isLoading ? <h1>...</h1> : ""}

          <Typography>Do you not have a account ? <Link to="/register">Sign Up</Link> </Typography>

          {isError ? <h2>Неверный логин и пароль</h2> : ""}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Auth;