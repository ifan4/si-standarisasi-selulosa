import Header from '../../component/header/normal-header'
import { Typography,Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Detail(){
    const navigate = useNavigate()

    return(
        <>
            <Header/>
            <Typography 
            sx={{ 
                width: {xs: '90%',md: '50%'},textAlign:'center',padding:'20px', margin: 'auto', fontSize:{xs: '15px', md: '33px'}, fontWeight: 'bold'
             }}
            >
                SNI 103:2017 Kertas Tisu Muka
            </Typography>
            <Typography 
            sx={{ 
                width: {xs: '90%',md: '50%'},textAlign:'center', margin: 'auto',
                fontSize: {xs: '12px', md: '20px'}, marginBottom: '12px'
             }}
            >
                <h5>Deskripsi Singkat</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit odio ipsam beatae adipisci magnam minus ducimus consequatur distinctio veritatis assumenda expedita aliquam excepturi dolor quod, aperiam incidunt quisquam perspiciatis cumque tempore quasi deserunt enim id sunt eveniet! Quo similique fugiat animi deleniti debitis eos ullam, ab, officiis velit neque non.</p>
                <p>
                    SNI dapat dimiliki dengan membeli di <a href="#">Link Pesta BSN atau  SISPK SNI</a>
                </p>
                <Button onClick={()=>navigate('/')}>{'< Kembali'}</Button>
            </Typography>
        </>
    )
}