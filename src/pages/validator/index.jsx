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
    })

    useEffect(()=>{
        getData()
    },[])


    const getData = async()=>{
        try {
            const res = await request({
                    url: '/validator',
                    method: 'get'
                })

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
            })
        } catch (error) {
            
        }
    }

    return(
        <Layout title={'Dashboard'} role={'Validator'}>
            <h1>Welcome to Validator Dashboard!</h1>


            <Grid container spacing={2}>
                <Grid xs={12} md={4}>
                    <VarCard title={'Total Data Standar'} value={state.totalData}/>
                </Grid>
                <Grid xs={12} md={4}>
                    <VarCard title={'Data Validated'} value={state.dataValidated}/>
                </Grid>
                <Grid xs={12} md={4}>
                    <VarCard title={'Data Need Validate'} value={state.dataNeedValidated}/>
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