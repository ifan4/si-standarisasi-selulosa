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
import { useState } from "react";
import { request } from "../../../utils/axios-utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Button from '@mui/lab/LoadingButton';

export default function AddDataStandar(){
    const [state,setState] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    })
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(false)
    console.log('state nih');
    console.log(state);

    const onChangeHandler = (e)=>{
        return setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await request({
                url: '/admin/add_user',
                method: 'POST',
                data: state
                
            })
            Swal.fire(
                'Data Updated!',
                'You successfully updated a user!',
                'success'
            )
            navigate('../')
        } catch (error) {
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
        <Layout title={"Data Standar Management"}>
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
                            Submit
                        </Button>
                    </Grid>
                    </Grid>
            </form>
        </Layout>
    )
}