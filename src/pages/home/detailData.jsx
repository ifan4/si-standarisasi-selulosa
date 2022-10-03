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
        desc: '',
        link: ''
    })
    const [role,setRole] = useState('public')

    const navigate = useNavigate()

    useEffect(()=>{
        checkRole()
    },[])

    const checkRole = async ()=>{
        try {
            const res = await request({
                url: '/profile',
                method: 'get'
            })
            
            setRole('user')
            return getDataAuth()
        } catch (error) {
            return getDataPublic()
            
        }
    }




    const [searchParams] = useSearchParams();



    const getDataPublic = async()=>{
        try {
            const res = await request({
                url: '/public/'+searchParams.get('id'),
                method: 'GET'
            },false)


            setState(
                {
                    ...state,
                    standar: res.data.data[0].standar,
                    judul: res.data.data[0].judul,
                    desc: res.data.data[0].deskripsi
                }
            )
            
        } catch (error) {
            console.log('Gagal');
            console.log(error);
        }
    }
    const getDataAuth = async()=>{
        try {
            const res = await request({
                url: '/user/'+searchParams.get('id'),
                method: 'GET'
            })

            setState(
                {
                    standar: res.data.data[0].standar,
                    judul: res.data.data[0].judul,
                    desc: res.data.data[0].deskripsi,
                    link: res.data.data[0].link
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
                <Typography>
                    {state.desc}
                </Typography>
                <p>
                    SNI dapat dimiliki dengan membeli di <a href="https://pesta.bsn.go.id/" target={"_blank"}>Link Pesta BSN atau  SISPK SNI</a>
                </p>
                {
                    role == 'user' &&
                    <a target={'_blank'} href={`https://sisis.ifandri.com/${state.link}`} style={{ display: 'block',textDecoration: 'none' }}>
                        <Button variant='contained'>Lihat File</Button>
                    </a>
                }
                <Button onClick={()=>navigate('../')}>{'< Kembali'}</Button>

            </Typography>
        </>
    )
}