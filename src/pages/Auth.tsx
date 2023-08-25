import { FC, useEffect, useState } from "react";
import { Avatar, TextField, Button, Typography, Box, ThemeProvider, Container, CssBaseline, createTheme } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../store/authReducer/authApi";
import { setUser } from "../store/authReducer/authSlice";
import { useAppDispatch } from "../hooks/hooks";



const defaultTheme = createTheme();

const Auth: FC = () => {
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  });

  const [loginUserMutation, { data: loginMutatuonResultData, isSuccess, isError }] = useLoginUserMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  if (isError) {
    console.log("Произошла ошибка при аутентификаций")
    console.log(isError)

  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(loginMutatuonResultData));
      navigate("/dashboard");
    }
  }, [isSuccess, dispatch, loginMutatuonResultData, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginUserMutation(loginFormData);
  }




  // const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
  // return (
  //   <Grid>
  //     <Paper elevation={10} style={paperStyle} >
  //       <Grid alignContent='center'>
  //         <Avatar style={{ backgroundColor: '#268b17' }}><LockOutlinedIcon /></Avatar>
  //         <h2>Sign In</h2>
  //       </Grid>
  //       <Grid style={{ display: "flex", flexDirection: 'column', gap: 10 }}>
  //         <TextField variant="standard"
  //           label='Username'
  //           placeholder="Enter Username"
  //           value={loginFormData.username}
  //           onChange={e => setLoginFormData({ ...loginFormData, username: e.target.value })}
  //           fullWidth required />

  //         <TextField variant="standard"
  //           label='Password'
  //           placeholder="Enter Password"
  //           type="password"
  //           value={loginFormData.password}
  //           onChange={e => setLoginFormData({ ...loginFormData, password: e.target.value })}
  //           fullWidth required />

  //         <Button variant="contained" onClick={handleSubmit} fullWidth>Sign In</Button>

  //         {isLoading ? <h1>...</h1> : ""}

  //         <Typography>Do you not have a account ? <Link to="/register">Sign Up</Link> </Typography>

  //         {isError ? <h2>Неверный логин и пароль</h2> : ""}
  //       </Grid>
  //     </Paper>
  //   </Grid>
  // );
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              placeholder="Enter Username"
              value={loginFormData.username}
              onChange={e => setLoginFormData({ ...loginFormData, username: e.target.value })}
            />
            <TextField
              margin="normal"
              type="password"
              required
              fullWidth
              label='Password'
              value={loginFormData.password}
              onChange={e => setLoginFormData({ ...loginFormData, password: e.target.value })}
              placeholder="Enter Password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          {isError ? "Ошибка при аутентификаций" : ""}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Auth;