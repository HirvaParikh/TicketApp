import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import BackgroundImage from '../images/back.jpeg'
import Ticket from './Tickets';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { http } from '../config/http';
import { Button } from '@mui/material';
import { setUser } from '../features/user/userSlice';
// import { mainListItems, secondaryListItems } from './listItems';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

export default function DashboardContent() {
  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userData,setUserData] = useState({})
  const [tokenData,setTokenData] = useState()

  useEffect(()=>{
    setUserData(JSON.parse(localStorage.getItem("user")))
    console.log("userData", userData.firstName);
    setTokenData(localStorage.getItem("token"))

  }, [])
  

  const getTickets = async () => {
    try{
      const res = await http.get("/ticket/all")
      return res?.data?.tickets
    }catch(e){
      console.log(e.message);
    }
  }
  const handleLogout = () =>{
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }
  return (
    <>{ tokenData && userData?
    <header style={ HeaderStyle }>
      <Box sx={{ display: 'flex' }}>
        {/* <CssBaseline /> */}
        <AppBar position="absolute" sx={{ backgroundColor:	"rgb(220, 190, 170)"}}>
          <Toolbar>            
            <Typography
              component="h1"
              variant="h4"
              color="black"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>    
            <Typography>Welcome, {userData.firstName} {" "} {userData.lastName}</Typography>     
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button onClick={handleLogout} variant="contained" style={{ backgroundColor: "red"}}> LogOut</Button> 
          </Toolbar>
        </AppBar>    
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                 <Ticket getList={getTickets}/>
                </Paper>
              </Grid>
            </Grid>
           
          </Container>
        </Box>
      </Box>
    </header>
    : navigate("/")
}
    </>
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