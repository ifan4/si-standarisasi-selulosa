import Header from '../../component/header/normal-header'
import { Typography,Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { request } from '../../utils/axios-utils';

export default function Detail(){
    let { id } = useParams()
    const [state,setState] = useState({
        standar: '',
        judul: '',
        desc: ''
    })
    console.log('ini state');
    console.log(state);
    const navigate = useNavigate()

    useEffect(()=>{
        getData()
    },[])


    const [searchParams] = useSearchParams();
    useEffect(()=>{
        console.log(searchParams.get('id'));
    },[])


    const getData = async()=>{
        try {
            const res = await request({
                url: '/public/'+searchParams.get('id'),
                method: 'GET'
            },false)

            console.log('berhasil');
            console.log(res.data.data[0]);

            setState(
                {
                    standar: res.data.data[0].standar,
                    judul: res.data.data[0].judul,
                    dedsc: res.data.data[0].deskripsi
                }
            )
            
        } catch (error) {
            console.log('Gagal');
            console.log(error);
        }
    }


    return(
        <>
            <Header/>
            <Typography 
            sx={{ 
                width: {xs: '90%',md: '50%'},textAlign:'center',padding:'20px', margin: 'auto', fontSize:{xs: '15px', md: '33px'}, fontWeight: 'bold'
             }}
            >
                {state.standar} {state.judul}
            </Typography>
            <Typography 
            sx={{ 
                width: {xs: '90%',md: '50%'},textAlign:'center', margin: 'auto',
                fontSize: {xs: '12px', md: '20px'}, marginBottom: '12px'
             }}
            >
                <h5>Deskripsi Singkat</h5>
                <p>{state.desc}</p>
                <p>
                    SNI dapat dimiliki dengan membeli di <a href="#">Link Pesta BSN atau  SISPK SNI</a>
                </p>
                <Button onClick={()=>navigate('/')}>{'< Kembali'}</Button>
            </Typography>
        </>
    )
}