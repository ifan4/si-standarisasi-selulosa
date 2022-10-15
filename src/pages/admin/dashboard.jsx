import Layout from "../../component/layout/mainLayout";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from "react";
import { request } from "../../utils/axios-utils";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


export default function Index(props){
    const navigate = useNavigate()
    const [state,setState] = useState({
        totalData: '',
        dataValidated: '',
        dataNeedValidated: '',
        users: ''
    })

    useEffect(()=>{
        getData()
        if (!Cookies.get('accessToken')){
            navigate('/')
        }
    },[])


    const getData = async()=>{
        try {
            const [res,users] = await Promise.all([
                request({
                    url: '/admin',
                    method: 'get'
                }),
                request({
                    url: '/admin/users',
                    method: 'get'
                })

            ])

            let totalDataValidated = 0,dataNeedValidate=0
            res.data.data.map((item)=>{
                if (item.validasi_status === '1'){
                    totalDataValidated += 1
                }else if(item.validasi_status === '0'){
                    dataNeedValidate += 1
                }
            })
            setState({
                totalData: res.data.data.length,
                dataValidated: totalDataValidated,
                dataNeedValidated: dataNeedValidate,
                users: users.data.data.length
            })
        } catch (error) {
            
        }
    }

    return(
        <Layout title={'Dashboard'}>
            <h1>Welcome to Admin Dashboard!</h1>
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 200,
                },
            }}
            >
                
                
                
                
            </Box>

            <Grid container spacing={2}>
                <Grid xs={12} md={3}>
                    <VarCard title={'Total Data Standar'} value={state.totalData}/>
                </Grid>
                <Grid xs={12} md={3}>
                    <VarCard title={'Data Validated'} value={state.dataValidated}/>
                </Grid>
                <Grid xs={12} md={3}>
                    <VarCard title={'Data Need Validate'} value={state.dataNeedValidated}/>
                </Grid>
                <Grid xs={12} md={3}>
                    <VarCard title={'Users'} value={state.users}/>
                </Grid>
            </Grid>
        </Layout>
    )
}


const VarCard = ({title,value=0})=>{
    return(
        <Paper elevation={3} 
        sx={{ 
            textAlign: 'center',
            paddingBottom: '40px',
            paddingTop: '5px'
        }}>
            <h4>{title}</h4>
            <div style={{ fontSize: '23px',fontWeight:'bold'}}>{value}</div>
        </Paper>
    )
}