import Layout from "../../component/layout/mainLayout";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from "react";
import { request } from "../../utils/axios-utils";

export default function Index(props){
    const [state,setState] = useState({
        totalData: '',
        dataValidated: '',
        dataNeedValidated: '',
        users: ''
    })

    useEffect(()=>{
        getData()
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

            console.log('res getData()');
            console.log(res.data);
            let totalDataValidated = 0,dataNeedValidate=0
            res.data.data.map((item)=>{
                if (item.validasi_status === '1'){
                    totalDataValidated += 1
                    console.log(totalDataValidated);
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
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis laborum in ratione neque libero vitae ipsam quod veniam? Quibusdam numquam debitis quaerat sed reiciendis ullam nesciunt doloribus, id soluta.</p>
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
            <div>{value}</div>
        </Paper>
    )
}