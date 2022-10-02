import Layout from "../../component/layout/mainLayout";
import { TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Unstable_Grid2';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useState } from "react";
import { request } from "../../utils/axios-utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Button from '@mui/lab/LoadingButton';
import { convertRole } from "../../helper";

export default function AddDataStandar(){
    const [state,setState] = useState({
        name: '',
        email: '',
        // password: '',
        role: ''
    })
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(false)
    console.log('state nih');
    console.log(state);

    useEffect(()=>{
        getProfile()
    },[])

    // const onChangeHandler = (e)=>{
    //     return setState({
    //         ...state,
    //         [e.target.name]: e.target.value
    //     })
    // }
    const getProfile = async ()=>{
        try {
          const res = await request({
            url: '/profile',
            method: 'get'
          })
          console.log('res.data profile');
          console.log(res.data);
          setState({
            name: res.data.name,
            email: res.data.email,
            role: convertRole(res.data.role),
          })
        } catch (error) {
          
        }
      }



    return(
        <Layout title={"My Profile"} role={state.role}>
                <Grid container spacing={3} 
                sx={ {
                    boxShadow: '1px 3px 5px',
                    padding: {xs: '2px', md: '40px'}
                } }
                >

                    <Grid md={12}>
                        <Typography sx={{ marginBottom:'10px' }} variant="h5">
                            General Information
                        </Typography>
                    </Grid>
                    <Grid md={6} xs={12}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">Name</InputLabel>
                            <Input
                            readOnly
                            value={state.name}
                            name="name"
                            />
                        </FormControl>
                    </Grid>
                    <Grid md={6} xs={12}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">Email</InputLabel>
                            <Input
                            readOnly
                            value={state.email}
                            type="email"
                            name="email"
                            />
                        </FormControl>
                    </Grid>
                    {/* <Grid md={6} xs={12}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel id="demo-simple-select-label">Password</InputLabel>
                            <Input
                            readOnly
                            value={state.password}
                            name="password"
                            />
                        </FormControl>
                    </Grid> */}
                    <Grid md={6} xs={12}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Input
                            readOnly
                            value={state.role}
                            name="role"
                            />
                        </FormControl>
                    </Grid>
                    </Grid>
        </Layout>
    )
}