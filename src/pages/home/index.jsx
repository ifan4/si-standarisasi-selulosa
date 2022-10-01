import Header from '../../component/header/normal-header'
import { Typography,Divider,InputLabel,Input,Container,Button,Select,MenuItem,FormControl } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MUIDataTable from "mui-datatables";
import { useNavigate,Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { request } from '../../utils/axios-utils';

const columns = [
    {
        name: "Standar",
    }, 
    {
        name: "Judul",
    }, 
    // {
    //     name: "City",
    // }, 
    {
        name: "Kategori",
    }, 
    {
        name: "Tahun",
    }, 
    {
        name: "Status Berlaku",
        options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                if (value == 1){
                    return "Yes"
                }
                else
                return "No"
            }
        }
    }, 
    // {
    //     name: "Baca",
    // }, 
    // {
    //     name: "Validasi",
    // }, 
    {
        name: "Action",
        options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                <Link to={`/detailData?id=${value}`} style={{ textDecoration: 'none' }}>
                    <Button variant='outlined' size='small'>Detail</Button>
                </Link>
                );
            }
        }
    }

          
];

const data = [
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
];

export default function Home(){
    const [data,setData] = useState([])
    console.log('state data');
    console.log(data);

    const options = {
        selectableRows: false, // <===== will turn off 
        filter: false,
        download: false,
        print: false,
        viewcolumn: false
    };

    const getData = async()=>{
        try {
            const res = await request({
                url: '/public',
                method: 'GET'
            },false)

            console.log('berhasil');
            console.log(res.data.data);

            setData(
                res.data.data.map((item)=>{
                    return[
                        item.standar,
                        item.judul,
                        item.kategori,
                        item.tahun,
                        item.validasi_status,
                        item.id
                    ]
                })
            )
            
        } catch (error) {
            console.log('Gagal');
            console.log(error);
        }
    }

    useEffect(()=>{
        getData()
    },[])

    return(
        <>
            <Header/>
            <Typography 
            sx={{ 
                width: {xs: '90%',md: '50%'},textAlign:'center',padding:'20px', margin: 'auto', fontSize:{xs: '15px', md: '33px'}, fontWeight: 'bold'
             }}
            >
                Selamat Datang di Sistem Informasi Standardisasi Industri Selulosa
            </Typography>
            <Typography 
            sx={{ 
                width: {xs: '90%',md: '50%'},textAlign:'center', margin: 'auto',
                fontSize: {xs: '12px', md: '20px'}, marginBottom: '12px'
             }}
            >
                Anda dapat mengakses informasi terbaru data-data SNI produk,  SNI metode uji, SNI ekolabel, dan Standar Industri Hijau yang berlaku di Industri Selulosa.
            </Typography>
            <Divider sx={{ marginY:'2px' }}/>
            <Divider sx={{ marginY:'2px' }}/>

            <Container maxWidth={'xxl'} sx={{ marginY: '10px' }}>
                <Typography>Filters:</Typography>
                <Grid container space={2} alignItems={'center'} marginBottom={3}>
                    <Grid md={2}>
                        <InputLabel htmlFor="standard-adornment-amount">SNI</InputLabel>
                        <Input
                            
                        />
                    </Grid>
                    <Grid md={2}>
                        <InputLabel htmlFor="standard-adornment-amount">Judul</InputLabel>
                        <Input
                            
                        />
                    </Grid>
                    <Grid md={2}>
                        <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                        <Select
                        variant='standard'
                        sx={{ width:{xs: '100%',md:'80%'} }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            >
                            <MenuItem value={10}>SNI Produk</MenuItem>
                            <MenuItem value={20}>Cara Uji</MenuItem>
                            <MenuItem value={30}>Ekolabel</MenuItem>
                        </Select>
                    </Grid>
                    <Grid md={2}>
                        <InputLabel htmlFor="standard-adornment-amount">Tahun</InputLabel>
                        <Input
                            
                        />
                    </Grid>
                    <Grid>
                        <Button variant='contained'>GO</Button>
                    </Grid>
                </Grid>
                <MUIDataTable
                title={"Data Standar"}
                data={data}
                columns={columns}
                options={options}
                />
            </Container>
        </>
    )
}