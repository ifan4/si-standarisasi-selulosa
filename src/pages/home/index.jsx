import Header from '../../component/header/normal-header'
import { Typography,Divider,Input,Container,Button,Select,MenuItem,FormControl,Paper,Skeleton,Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate,Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { request } from '../../utils/axios-utils';
import { convertStatus, convertStatusBerlaku } from '../../helper';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);



var options = {
    tooltips: {
  enabled: false
},
      plugins: {
     datalabels: {
         formatter: (value, ctx) => {

           let sum = 0;
           let dataArr = ctx.chart.data.datasets[0].data;
           dataArr.map(data => {
               sum += data;
           });
           let percentage = (value*100 / sum).toFixed(2)+"%";
           return percentage;
         },
         color: '#fff',
              }
 }
};




export default function Home(){
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [count,setCount] = useState({
        "SNI_produk": 0,
        "SNI_Cara_Uji": 0,
        "SNI_Ekolabel": 0,
        "Standar_Industri_Hijau": 0,
        "total_data": 0
    })



    const getCountData = async()=>{
        setLoading(true)
        try {
            const res = await request({
                url: '/count_data'
            }) 

            setCount({
                "SNI_produk": res.data.data['SNI Produk'] ? res.data.data['SNI Produk'] : 0,
                "SNI_Cara_Uji": res.data.data['SNI Cara Uji'] ? res.data.data['SNI Cara Uji'] : 0,
                "SNI_Ekolabel": res.data.data['SNI Ekolabel'] ? res.data.data['SNI Ekolabel'] : 0,
                "Standar_Industri_Hijau": res.data.data['Standar Industri Hijau'] ? res.data.data['Standar Industri Hijau'] : 0,
                "total_data": res.data.data['total']
            })
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(()=>{
        getCountData()
    },[])

    const chartData = {
        labels: ['SNI Produk', 'SNI Cara Uji', 'SNI Ekolabel', 'Standar Industri Hijau'],
        datasets: [
          {
            label: '# of Votes',
            data: [count.SNI_produk, count.SNI_Cara_Uji, count.SNI_Ekolabel, count.Standar_Industri_Hijau],
            backgroundColor: [
              '#00A9D7',
              '#FFA400',
              '#1CD0BB',
              '#6E7C7C',
            ],
            borderColor: [
              '#00A9D7',
              '#FFA400',
              '#1CD0BB',
              '#6E7C7C',
            ],
            borderWidth: 0,
            
          },
        ],
      };

    return(
        <>
            <Header/>

            {
                loading 
                ?
                <Stack spacing={1}
                sx={{ 
                    margin: {xs: '10px', md: '50px'},
                 }}
                >
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: '50px',marginTop: '20px' }} />
                    <Skeleton variant="rectangular" width={250} height={250} />
                    <Skeleton variant="rounded" width={210} height={60} />
                    <Skeleton variant="text" sx={{ fontSize: '50px' }} />
                    <Skeleton variant="text" sx={{ fontSize: '50px' }} />
                    <Skeleton variant="text" sx={{ fontSize: '50px' }} />
                    <Skeleton variant="text" sx={{ fontSize: '50px' }} />
                </Stack>
                :
                <div>
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

                    <Container maxWidth={'xxl'} sx={{ marginY: '30px' }}>
                        <Grid container spacing={1}>
                            <Grid xs={12} md={5}
                            sx={{ 
                                padding: {xs: '10px' ,md: '50px'},
                                paddingTop: {md: '0px'}
                            }}
                            >
                                <Pie
                                data={chartData}
                                plugins={[ChartDataLabels]}
                                options={options}
                                />
                            </Grid>

                            <Grid container spacing={4} xs={12} md={7} alignContent={'start'}>

                                <Grid xs={12}>
                                    <Paper elevation={2} 
                                    sx={{ 
                                        textAlign: 'center',
                                        paddingBottom: '40px',
                                        paddingTop: '5px'
                                    }}>
                                        <h4>Total Data Standar</h4>
                                        <div style={{ fontSize: '29px',fontWeight:'bold'}}>{count.total_data}</div>
                                    </Paper>
                                </Grid>

                                <Grid padding={0} xs={12}
                                sx={{ 
                                    textAlign: 'center'
                                }}>
                                    <h3>Lihat Data Berdasarkan Kategori</h3>
                                </Grid>

                                <CategoryButton 
                                title={'SNI Produk'}
                                link={`dataStandar?category=SNI Produk`}
                                color={'#00A9D7'}
                                />
                                <CategoryButton 
                                title={'SNI Cara Uji'}
                                link={`dataStandar?category=SNI Cara Uji`}
                                color={'#FFA400'}
                                />
                                <CategoryButton 
                                title={'SNI Ekolabel'}
                                link={`dataStandar?category=SNI Ekolabel`}
                                color={'#1CD0BB'}
                                />
                                <CategoryButton 
                                title={'Standar Industri Hijau'}
                                link={`dataStandar?category=Standar Industri Hijau`}
                                color={'#6E7C7C'}
                                />
                            

                            </Grid>
                        </Grid>
                    </Container>
                </div>

            }

        </>
    )
}

const CategoryButton = ({title,color,link})=>{
    const navigate = useNavigate()
    return(
        <Grid xs={12} md={6}>
            <Button 
            onClick={()=>navigate(link)}
            variant={'contained'}
            sx={{ 
                width:'100%',
                height: '60px',
                backgroundColor: `${color}`
            }}
            >
                {title}
            </Button>
        </Grid>
    )
}