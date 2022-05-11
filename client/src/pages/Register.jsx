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
import { http } from '../config/http';
import BackgroundImage from '../images/back.jpeg';

export default function Register() {
    const formik = useFormik({
        initialValues: {
            firstName:"",
            lastName:"",
            email: "",
            password:"",
        },
        onSubmit:async(values)=>{
            alert(JSON.stringify(values,null,2));
            const res = await http.post("user/register",values);
            console.log(res); 
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
          <Avatar sx={{ m: 1, bgcolor: 'black' }}>
           <PersonSharpIcon/>
          </Avatar>
          <Typography component="h1" variant="h4">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  autoFocus
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  id="lastName"
                  autoComplete="family-name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>Already have an account? 
                <Link href="/" variant="body2">
                  Login
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