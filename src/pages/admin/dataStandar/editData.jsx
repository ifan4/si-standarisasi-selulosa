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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from '@mui/lab/LoadingButton';
import Cookies from "js-cookie";

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
    let { id } = useParams()
    const [searchParams] = useSearchParams();
    const [isLoading,setIsLoading] = useState(false)


    useEffect(()=>{
        if (!Cookies.get('accessToken')){
            navigate('/')
        }
        getData()
    },[])



    const onChangeHandler = (e)=>{
        return setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const getData = async()=>{
        try {
            const res = await request({
                url: '/admin/data/detail/'+searchParams.get('id'),
                method: 'get'
            })
            
            console.log('res getdAta()');
            console.log(res);
            setState(
            {
                standar: res.data.data.standar,
                judul: res.data.data.judul,
                kategori: res.data.data.kategori,
                tahun: res.data.data.tahun,
                status: res.data.data.status,
                deskripsi: res.data.data.deskripsi,
                document: res.data.data.link
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
                url: '/admin/data/edit/'+searchParams.get('id'),
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: state
                
            })

            Swal.fire(
                'Data Updated!',
                'You successfully Updated a data standard!',
                'success'
            )
            navigate('../')
        } catch (error) {
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
            <Typography sx={{ marginBottom:'10px' }}>Edit Data Standar</Typography>
            <form onSubmit={onSubmitHandler}>
            <Grid container spacing={3} >
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Standar</InputLabel>
                        <Input
                        required
                        name="standar"
                        value={state.standar}
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
                        value={state.judul}
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
                        value={state.kategori}
                        onChange={onChangeHandler}
                        >
                            <MenuItem value={'SNI Produk'}>SNI Produk</MenuItem>
                            <MenuItem value={'SNI Cara Uji'}>SNI Cara Uji</MenuItem>
                            <MenuItem value={'SNI Ekolabel'}>SNI Ekolabel</MenuItem>
                            <MenuItem value={'Standar Industri Hijau'}>Standar Industri Hijau</MenuItem>
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
                         value={state.tahun}
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
                        value={state.status}
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
                        value={state.deskripsi}
                        onChange={onChangeHandler}
                        />
                    </FormControl>
                </Grid>
                <Grid md={6}>
                    <a href={`${process.env.REACT_APP_BASE_URL}/${state.document}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="outlined">
                            Lihat Dokumen
                        </Button>    
                    </a>
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