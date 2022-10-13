import Layout from "../../../component/layout/mainLayout";

import Grid from '@mui/material/Unstable_Grid2';
import {Button,Box,Paper,Typography,Skeleton} from '@mui/material'
import { useEffect, useState } from "react";
import { request } from "../../../utils/axios-utils";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function Index(props){
    const navigate = useNavigate()
    const [open,setOpen] = useState(false)

    useEffect(()=>{
        if (!Cookies.get('accessToken')){
            navigate('/')
        }
    },[])



    return(
        <Layout title={'Bantuan Management'}>
            <h3>Link Bantuan Berdasarkan Role</h3>


            <Grid container spacing={2}>
                <Grid xs={12} md={3}>
                    <VarCard 
                    title={'Admin'} 
                    link={'#'}
                    urlAPI={'/admin/panduan/1'} 
                    />
                </Grid>
                <Grid xs={12} md={3}>
                    <VarCard 
                    title={'User'} 
                    urlAPI={'/admin/panduan/2'}
                    />
                </Grid>
                <Grid xs={12} md={3}>
                    <VarCard 
                    title={'Validator'} 
                    urlAPI={'/admin/panduan/3'}
                    />
                </Grid>
                <Grid xs={12} md={3}>
                    <VarCard 
                    title={'Public'} 
                    urlAPI={'/admin/panduan/0'}
                    />
                </Grid>
            </Grid>
        </Layout>
    )
}


const VarCard = ({title,urlAPI})=>{
    const [link,setLink] = useState()
    const [role,setRole] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
      getData()
      switch (title) {
            case 'Admin':
              setRole('1')
              break;
            case 'User':
              setRole('2')
              break;
            case 'Validator':
              setRole('3')
              break;
            case 'Public':
              setRole('0')
              break;
          
            default:
              break;
      }
    },[])

    const getData = async()=>{
      setIsLoading(true)
      try {
        const res = await request({
          url: urlAPI,
          method: 'GET'
        })

        setLink(process.env.REACT_APP_BASE_URL+'/'+res.data.data)
      } catch (error) {
        
      }
      finally{
        setIsLoading(false)
      }
    }

    if (isLoading){
      return(
        <>
          <Skeleton variant="rectangular" width={250} height={250} />
          <Skeleton variant="rounded" width={210} height={60} />
        </>
      )
    }

    return(
        <Button 
        role={'button'}
        variant={'outlined'}
        onClick={()=>{
            Swal.fire({
                title: title,
                inputLabel: 'Upload document here',
                showCancelButton: true,
                confirmButtonText: 'Update',
                input: 'file',
                inputAttributes: {
                  'accept': 'file/*',
                  'aria-label': 'Upload document here'
                },
                preConfirm: (login) => {
                  console.log('login')
                  console.log(login)
                  return request({
                    url: '/admin/panduan/edit/'+role,
                    method: 'POST',
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    data: {
                      'role': role,
                      'document': login
                    }
                })
                .then((res)=>{
                  Swal.fire(
                    'Data Updated!',
                    `You successfully updated a ${title} helper link !`,
                    'success'
                  )
                })
                .catch((err)=>{
                  Swal.fire(
                    'Something Wrong!',
                    ``,
                    'error'
                  )
                })

                },
                html:
                  `<a target="_blank" href='${link}'>See current document</a>`,
              })
        }}
        sx={{ 
            textAlign: 'center',
            paddingY: '20px',
            width: '100%',
        }}>
            <h4>{title}</h4>
        </Button>
    )
}