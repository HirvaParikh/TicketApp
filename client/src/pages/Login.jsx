import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useFormik} from "formik";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { http } from '../config/http.js';
import BackgroundImage from '../images/back.jpeg'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { setUser } from '../features/user/userSlice.js';

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")

  }, [])
  

  const user = useSelector((state)=>state.user)
  const formik = useFormik({
      initialValues: {
          email: "",
          password:"",
      },
      onSubmit:async(values)=>{
          alert(JSON.stringify(values,null,2))
          const res = await http.post("user/login",values);
          console.log(res); 
          if(res.status === 200){
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("user",JSON.stringify(res.data.userData))
            dispatch(setUser(res.data.userData))
            navigate("/dashboard")
      }
    }
  })
  return (
    <header style={ HeaderStyle }>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            paddingTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
          <Avatar sx={{ m: 1 , bgcolor: 'black' }}>
            <PersonSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 4 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>Don't have a account?
                <Link href="/register" variant="body2">
                      Register
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </header>    
  );
}

const HeaderStyle = {
  width: "100%",
  height: "100vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
}