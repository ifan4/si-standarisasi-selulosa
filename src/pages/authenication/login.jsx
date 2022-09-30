import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Alert,
  Paper,
  Box,
  Typography
} from '@mui/material';
import Button from '@mui/lab/LoadingButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const navigate = useNavigate()
  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message,setMessage] = useState('')

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const onSubmitHandler = async(e)=>{
    setIsLoading(true)
    
    e.preventDefault()
 
      await axios({
        url: `https://sisisapi.000webhostapp.com/api/login?email=${email}&password=${password}`,
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then((res)=>{
        Cookies.set('accessToken', res.data.access_token)
        switch (res.data.role) {
          case 1:
            navigate('/admin')
            break;
          case 2:
            navigate('/')
            break;
          case 3:
            navigate('/validator')
            break;
          default:
            break;
        }

      })
      .catch((err)=>{
        console.log('Loggin Failed');
        setMessage('Email or password wrong!')
      })
      .finally(()=>{
        console.log(email,password);
        setIsLoading(false)
      })
    
  }

  return (
    <form 
    style={{ 
      display: 'flex',justifyContent: 'center',alignItems:'center',height:'100vh'
      }}
      onSubmit={onSubmitHandler}
      >
      <Paper sx={{ padding: {xs: '10px', md: '50px'} }}>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
            <Grid item xs={12}>
                <Box sx={{ flexGrow: 1, display:'flex', alignItems:'center'}}>
                    <Grid marginRight={'23px'}> 
                        <img src="../logo-sis.png" alt="" width={'37px'}/>
                    </Grid>
                    <Grid>
                        <Typography 
                        sx={{ 
                            fontSize:'14px', 
                            letterSpacing:'2px', 
                            lineHeight:'18px',
                            fontWeight:'bold',
                            color: 'dark'
                            }}>
                                LOGIN
                        </Typography>
                    </Grid>
                </Box>
            </Grid>
          <Grid item xs={12}>
            <TextField 
            label="Email" 
            required
            type={'email'}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField 
            label="Password" 
            type={'password'}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required></TextField>
          </Grid>
          <Grid item xs={12}>
          {
            message &&
            <Alert severity="error">Email atau password salah!</Alert>
          }
          </Grid>
          <Grid item xs={12}>
            <Button 
            type='submit' 
            fullWidth 
            variant='outlined'
            loading={isLoading}
            > Login </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default LoginPage;
