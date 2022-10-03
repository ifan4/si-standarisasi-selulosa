import Layout from "../../../component/layout/mainLayout";
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
import { request } from "../../../utils/axios-utils";
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from '@mui/lab/LoadingButton';
import Cookies from "js-cookie";

export default function AddDataStandar(){
    const [state,setState] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    })
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(false)
    
    const [searchParams] = useSearchParams();

    const onChangeHandler = (e)=>{
        return setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        getData()
        if (!Cookies.get('accessToken')){
            navigate('/')
        }
    },[])

    const getData = async()=>{
        try {
            const res = await request({
                url: '/admin/user/detail/'+searchParams.get('id'),
                method: 'get'
            })
            
            console.log('res getdAta()');
            console.log(res);
            setState(
            {
                name: res.data.data.name,
                email: res.data.data.email,
                password: '',
                role: res.data.data.role
            }
            )
        } catch (error) {
            
        }
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await request({
                url: '/admin/user/edit/'+searchParams.get('id'),
                method: 'POST',
                data: state
                
            })
            console.log('res berhasil update');
            console.log(res);
            Swal.fire(
                'Data Updated!',
                'You successfully updated a user!',
                'success'
            )
            navigate('../')
        } catch (error) {
            
            console.log('res error');
            console.log(error);
            Swal.fire(
                'Something wrong!',
                'Please check carefully your data',
                'error'
            )
        }
        finally{
            setIsLoading(false)
        }
    }

    return(
        <Layout title={"Users Management"}>
            <Typography sx={{ marginBottom:'10px' }}>
                Add User
            </Typography>
            <form onSubmit={onSubmitHandler}>
                <Grid container spacing={3} >
                    <Grid md={6}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">Name</InputLabel>
                            <Input
                            required
                            name="name"
                            value={state.name}
                            onChange={onChangeHandler}
                            />
                        </FormControl>
                    </Grid>
                    <Grid md={6}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">Email</InputLabel>
                            <Input
                            required
                            type="email"
                            name="email"
                            value={state.email}
                            onChange={onChangeHandler}
                            />
                        </FormControl>
                    </Grid>
                    <Grid md={6}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel id="demo-simple-select-label">Password</InputLabel>
                            <Input
                            required
                            name="password"
                            onChange={onChangeHandler}
                            />
                        </FormControl>
                    </Grid>
                    
                    <Grid md={6}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                            <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="role"
                            value={state.role}
                            onChange={onChangeHandler}
                            >
                                <FormControlLabel value="1" control={<Radio required/>} label="Admin" />
                                <FormControlLabel value="2" control={<Radio required/>} label="User" />
                                <FormControlLabel value="3" control={<Radio required/>} label="Validator" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                
                    <Grid md={12}>
                        <Button variant="outlined" color="error" sx={{ marginRight: '5px' }}
                        type={'reset'}
                        >
                            Reset
                        </Button>
                        <Button loading={isLoading} variant="contained" type="submit">
                            Update
                        </Button>
                    </Grid>
                    </Grid>
            </form>
        </Layout>
    )
}