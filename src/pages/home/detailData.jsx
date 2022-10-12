import Header from '../../component/header/normal-header'
import { Typography,Button,Skeleton  } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { request } from '../../utils/axios-utils';

const variants = ['h1', 'h3', 'body1', 'caption'];

export default function Detail(){
    let { id } = useParams()
    const [state,setState] = useState({
        standar: '',
        judul: '',
        desc: '',
        link: ''
    })
    const [role,setRole] = useState('public')
    const [URLBeli,setURLBeli] = useState('')
    const [isLoading, setIsLoading] = useState(true)
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
        setIsLoading(true)
        try {
            const res = await request({
                url: '/public/'+searchParams.get('id'),
                method: 'GET'
            },false)

            if (res.data.data[0].kategori === "Standar Industri Hijau"){
                setURLBeli('http://jdih.kemenperin.go.id/site/cari_peraturan_detail')
            }else{
                setURLBeli('https://pesta.bsn.go.id/')
            }


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
        finally {
            setIsLoading(false)
        }
    }
    const getDataAuth = async()=>{
        setIsLoading(true)
        try {
            const res = await request({
                url: '/user/'+searchParams.get('id'),
                method: 'GET'
            })
            if (res.data.data[0].kategori === "Standar Industri Hijau"){
                setURLBeli('http://jdih.kemenperin.go.id/site/cari_peraturan_detail')
            }else{
                setURLBeli('https://pesta.bsn.go.id/')
            }

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
        finally {
            setIsLoading(false)
        }
    }


    return(
        <>
            <Header/>
            {
                isLoading 
                ?
                variants.map((variant) => (
                    <Typography 
                    component="div" 
                    key={variant} 
                    variant={variant}
                    sx={{ 
                        width: {xs: '90%',md: '50%'},textAlign:'center',padding:'20px', margin: 'auto', fontSize:{xs: '15px', md: '33px'}, fontWeight: 'bold'
                    }}
                    >
                      {isLoading ? <Skeleton /> : variant}
                    </Typography>
                  ))
                :
                <div>
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
                            SNI dapat diakses dengan login atau mengakses link  <a href={URLBeli} target={"_blank"}>Pesta BSN atau  SISPK SNI</a>
                        </p>
                        {
                            role == 'user' &&
                            <a target={'_blank'} href={`${process.env.REACT_APP_BASE_URL}/${state.link}`} style={{ display: 'block',textDecoration: 'none' }}>
                                <Button variant='contained'>Lihat File</Button>
                            </a>
                        }
                        <Button onClick={()=>navigate(-1)}>{'< Kembali'}</Button>

                    </Typography>
                </div>
            }
        </>
    )
}