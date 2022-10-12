import Header from '../../component/header/normal-header'
import { Container,Button,Skeleton,Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MUIDataTable from "mui-datatables";
import { useNavigate,Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { request } from '../../utils/axios-utils';
import { convertStatus, convertStatusBerlaku } from '../../helper';
import { useSearchParams } from 'react-router-dom';

const variants = ['h1', 'h3', 'body1', 'caption'];
const columns_var = [
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
        name: "File Tersedia",    
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


export default function DataByCategory(){
    const navigate = useNavigate()
    const [columns,setColumns] = useState(columns_var)
    const [data,setData] = useState([])
    const [isLoading,setIsLoading] = useState()
   
    const [searchParams] = useSearchParams();
    const [category, setCategory] = useState('')
    // Category dibagi menjadi 4, yaitu 
    // 1. SNI Produk 
    // 2.SNI Cara Uji
    // 3. SNI Ekolabel
    // 4.Standar Industri Hijau

    const [role,setRole] = useState('')
    

    const options = {
        selectableRows: false, // <===== will turn off 
        filter: true,
        download: false,
        print: false,
        viewColumns: false,
        responsive: 'standard'
    };
    useEffect(()=>{   
        checkRole()
    },[])
    useEffect(()=>{   
        getData()
    },[role])

    const getData = async()=>{
        setIsLoading(true)
        try {
            const res = await request({
                url: '/public',
                method: 'GET'
            },false)

            let tempData = res.data.data.map((item)=>{
                return searchParams.get('category') === item.kategori && ([
                    item.standar,
                    item.judul,
                    item.kategori,
                    item.tahun,
                    role === "user" ? convertStatusBerlaku(item.status) : item.id,
                    item.id
                ])
            })
            if (tempData){
                setData(
                    tempData.filter((item)=>{
                        return item && item
                    })
                )
            }
            
        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false)
        }
    }

    const checkRole = async ()=>{
        try {
            const res = await request({
                url: '/profile',
                method: 'get'
            })
            
            setRole('user')
            return true
        } catch (error) {
            console.log('ini public');
            setColumns(
                columns.filter((item)=>{
                    return item.name !== 'File Tersedia' && item
                })
            )
            setRole('public')
            return false
        }
    }



    return(
        <>
            <Header/>
   

            <Container maxWidth={'xxl'} sx={{ marginY: '10px' }}>
                <Button
                sx={{ marginY: '20px' }}
                onClick={()=>navigate('..')}
                variant={'contained'}
                >{'< '}Back</Button>

                {
                    isLoading
                    ?
                    variants.map((variant) => (
                        <Typography 
                        component="div" 
                        key={variant} 
                        variant={variant}
                        sx={{ 
                            width: '100%',textAlign:'center', margin: 'auto', fontSize:{xs: '15px', md: '33px'}, fontWeight: 'bold'
                        }}
                        >
                          {isLoading ? <Skeleton /> : variant}
                        </Typography>
                      ))
                    :
                    <MUIDataTable
                    title={`Data Standar (${searchParams.get('category')})`}
                    data={data}
                    columns={columns}
                    options={options}
                    />

                }

                
            </Container>
        </>
    )
}