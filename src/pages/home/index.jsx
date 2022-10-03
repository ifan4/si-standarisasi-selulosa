import Header from '../../component/header/normal-header'
import { Typography,Divider,InputLabel,Input,Container,Button,Select,MenuItem,FormControl } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MUIDataTable from "mui-datatables";
import { useNavigate,Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { request } from '../../utils/axios-utils';
import { convertStatus, convertStatusBerlaku } from '../../helper';

const columns = [
    {
        name: "Standar",
        options: {
            filter: false,
        }
    }, 
    {
        name: "Judul",
        options: {
            filter: false,
            sort: false
        }
    }, 
    // {
    //     name: "City",
    // }, 
    {
        name: "Kategori",
        options: {
            filter: true,
            filterOptions: ['SNI Produk','Cara Uji', 'Ekolabel'],
        }
    }, 
    {
        name: "Tahun",
    }, 
    {
        name: "Status Berlaku",    
        options: {
            filter: true,
            filterOptions: ['YES', 'NO'],
        }
    }, 
    {
        name: "Action",
        options: {
            filter: false,
            sort: false,
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


export default function Home(){
    const [data,setData] = useState([])

    const options = {
        selectableRows: false, // <===== will turn off 
        filter: true,
        download: false,
        print: false,
        viewColumns: false,
        responsive: 'standard'
    };

    const getData = async()=>{
        try {
            const res = await request({
                url: '/public',
                method: 'GET'
            },false)

            setData(
                res.data.data.map((item)=>{
                    return[
                        item.standar,
                        item.judul,
                        item.kategori,
                        item.tahun,
                        convertStatusBerlaku(item.status),
                        item.id
                    ]
                })
            )
            
        } catch (error) {
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
                Selamat Datang di Sistem Informasi Standarisasi Industri Selulosa
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
                {/* <Typography>Filters:</Typography> */}
                {/* <Grid container space={2} alignItems={'center'} marginBottom={3}>
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
                </Grid> */}
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