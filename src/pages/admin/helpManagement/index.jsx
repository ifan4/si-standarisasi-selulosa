import Layout from "../../../component/layout/mainLayout";

import Grid from '@mui/material/Unstable_Grid2';
import {Button,Box,Paper,Typography} from '@mui/material'
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
                    urlAPI={'/'} 
                    />
                </Grid>
                <Grid xs={12} md={3}>
                    <VarCard title={'User'} link={'#'}/>
                </Grid>
                <Grid xs={12} md={3}>
                    <VarCard title={'Validator'} link={'#'}/>
                </Grid>
                <Grid xs={12} md={3}>
                    <VarCard title={'Public'} link={'#'}/>
                </Grid>
            </Grid>
        </Layout>
    )
}


const VarCard = ({title,link})=>{
    const ipAPI = '//api.ipify.org?format=json'

    const inputValue = fetch(ipAPI)
    .then(response => response.json())
    .then(data => data.ip)

    return(
        <Button 
        role={'button'}
        variant={'outlined'}
        onClick={()=>{
            Swal.fire({
                title: title,
                input: 'text',
                inputAttributes: {
                  autocapitalize: 'off'
                },
                inputLabel: 'Input the file URL based on role below',
                inputPlaceholder: 'Enter the URL',
                showCancelButton: true,
                confirmButtonText: 'Update',
                showLoaderOnConfirm: true,
                inputValue: inputValue,
                inputValidator: (value) => {
                    if (!value) {
                      return 'You need to write something!'
                    }
                  },
                preConfirm: (login) => {
                  return fetch(`//api.github.com/users/${login}`)
                    .then(response => {
                      if (!response.ok) {
                        throw new Error(response.statusText)
                      }
                      return response.json()
                    })
                    .catch(error => {
                      Swal.showValidationMessage(
                        `Request failed: ${error}`
                      )
                    })
                },
                allowOutsideClick: () => !Swal.isLoading()
              }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Data Updated!',
                        `You successfully updated a ${title} helper link !`,
                        'success'
                    )
                }
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