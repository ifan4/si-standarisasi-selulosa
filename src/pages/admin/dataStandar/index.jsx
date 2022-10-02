import Layout from "../../../component/layout/mainLayout";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { request } from "../../../utils/axios-utils";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from 'sweetalert2'
import { Box } from "@mui/material";
import { convertStatus, convertStatusToColor } from "../../../helper";

const columns = [
    {
        name: "Standar",
        options: {
            filter: true,
        }
    }, 
    {
        name: "Judul",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "Kategori",
        options: {
            filter: true,
        }
    },
    {
        name: "Tahun",
        options: {
            filter: true,
        }
    }, 
    {
        name: "Dokumen",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value)=>{
                return(
                    <a href={`https://sisis.ifandri.com/${value}`} target={'_blank'} style={{ textDecoration: 'none' }}>
                        <Button variant="outlined">
                            Baca
                        </Button>
                    </a>
                )
            }
        }
    }, 
    {
        name: "Berlaku",
        options: {
            filter: true,
            // filterOptions: ['1', '0'],
            customBodyRender: (value)=>{
                return(
                    <>
                        {value === '1' ? 'Yes' : "No"}
                    </>
                )
            }
        }
    }, 
    {
        name: "Validasi",
        options: {
            filter: true,
            customBodyRender: (value,updateValue)=>{
                return(
                    <Box
                    sx={{ 
                        bgcolor: convertStatusToColor(value),
                        color: 'white',
                        padding: '5px',
                        paddingX: '10px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        
                     }}
                    >
                        {convertStatus(value)}
                    </Box>
                )
            }
        }
    }, 
    {
        name: "Action",
        options: {
          filter: false,
          sort: false,
          download:false,
          print: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                
                <Button 
              variant="outlined" 
              color="error" 
              size="small" 
              sx={{ margin: '2px' }}
              onClick={()=>{
                Swal.fire({
                    title: 'Are you sure want to delete this data?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Delete',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                        deleteData(value.id,tableMeta.tableData,value.setData)
                    }
                  })
              }}
              >
                Delete 
            </Button>
            <Link to={'edit?id='+value.id} style={{ textDecoration: 'none' }}>
                <Button 
                variant="contained" 
                color="success" 
                size="small" 
                sx={{ margin: '2px' }}
                onClick={()=>{
                   
                }}
                >
                    Edit
                </Button>
            </Link>
              </>
            );
          }
        }
      }
];

const deleteData = async (id,data,setData)=>{
    try {
        const res = await request({
            url: '/admin/data/' + id,
            method: 'POST'
        })
        let filteredData = data.filter((d)=> {
            return d[7].id !== id && d;
        })
        console.log(filteredData);
        setData(filteredData)
        
        return Swal.fire(
            'Deleted!',
            'The data has been deleted.',
            'success'
          )
    } catch (error) {
        console.log('error');
        console.log(error);
        return Swal.fire(
            'Something Wrong!',
            '',
            'error'
          )
    }
}




export default function DataStandar(){
    const [data,setData] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getData()
    },[])

    const getData = async()=>{
        try {
            const res = await request({
                url: '/admin',
                method: 'GET',
            })
            console.log(res);
            setData(
                res.data.data.map((item)=>{
                    return[
                        item.standar,
                        item.judul,
                        item.kategori,
                        item.tahun,
                        item.link,
                        item.status,
                        item.validasi_status,
                        {
                            id: item.id,
                            data:data, 
                            setData: setData
                        },
                    ]
                })
            )
        } catch (error) {
            console.log(error);
        }
    }

    const options = {
        print: false,
        selectableRows: false, // <===== will turn off 
        responsive: 'standard',
        customToolbar: () => {
        return (
            <Button 
            variant="contained"
            onClick={()=>{
                navigate('add')
            }}
            >
                Add Data
            </Button>
        );
        },
        
    };

    return(
        <Layout title={'Data Standar Management'}>
              
            <MUIDataTable
            title={"Data Standar"}
            data={data}
            columns={columns}
            options={options}
            />

        </Layout>
    )
}