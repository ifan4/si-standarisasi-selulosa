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
        standar: '',
        judul: '',
        kategori: '',
        tahun: '',
        status: '',
        deskripsi: '',
        document: ''
    })
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(false)

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
                url: '/admin/add_data',
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: state
                
            })

            Swal.fire(
                'Data Added!',
                'You successfully added a data standard!',
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
            <Typography sx={{ marginBottom:'10px' }}>Add Data Standar</Typography>
            <form onSubmit={onSubmitHandler}>
            <Grid container spacing={3} >
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Standar</InputLabel>
                        <Input
                        required
                        name="standar"
                        onChange={onChangeHandler}
                        />
                    </FormControl>
                </Grid>
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Judul</InputLabel>
                        <Input
                        required
                        name="judul"
                        onChange={onChangeHandler}
                        />
                    </FormControl>
                </Grid>
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                        <Select
                        required
                        name="kategori"
                        onChange={onChangeHandler}
                        >
                        <MenuItem value={'SNI Produk'}>SNI Produk</MenuItem>
                        <MenuItem value={'Cara Uji'}>Cara Uji</MenuItem>
                        <MenuItem value={'Ekolabel'}>Ekolabel</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Tahun</InputLabel>
                        <Input
                        required
                         type="number" min="1900" max="2099" step="1"
                         name="tahun"
                         onChange={onChangeHandler}
                        />
                    </FormControl>
                </Grid>
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                        <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="status"
                        onChange={onChangeHandler}
                        
                        >
                            <FormControlLabel value="1" control={<Radio required/>} label="Berlaku" />
                            <FormControlLabel value="0" control={<Radio required/>} label="Tidak" />
                    </RadioGroup>
                    </FormControl>
                </Grid>
                
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <FormLabel id="demo-row-radio-buttons-group-label">Dokumen</FormLabel>
                        <Input accept="image/*" multiple type="file" 
                        onChange={(e)=>setState({
                            ...state,
                            document: e.target.files[0]
                        })}
                        required
                        />
                         <Typography>*Maximal 10 mb, pdf format required</Typography>
                        
                    </FormControl>
                </Grid>
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <TextField
                        required
                        name="deskripsi"
                        label="Deskripsi Singkat"
                        placeholder="Placeholder"
                        multiline
                        rows={4}
                        variant="filled"
                        onChange={onChangeHandler}
                        />
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