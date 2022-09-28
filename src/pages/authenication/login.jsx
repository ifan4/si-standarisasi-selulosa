import React from 'react';
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button,
  Box,
  Typography
} from '@mui/material';
const LoginPage = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div style={{ display: 'flex',justifyContent: 'center',alignItems:'center',height:'100vh'}}>
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
            <TextField label="Username"></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'}></TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  label={'Keep me logged in'}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label="Keep me logged in"
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant='outlined'> Login </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default LoginPage;
