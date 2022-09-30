import Layout from "../../../component/layout/mainLayout";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { request } from "../../../utils/axios-utils";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from 'sweetalert2'

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
            filter: true,
        }
    }, 
    // {
    //     name: "City",
    //     options: {
    //         filter: false
    //     }
    // }, 
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
        name: "Status",
        options: {
            filter: false,
        }
    }, 
    {
        name: "Baca",
        options: {
            filter: false,
        }
    }, 
    {
        name: "Validasi",
        options: {
            filter: false,
        }
    }, 
    {
        name: "Action",
        options: {
          filter: true,
          sort: false,
          empty: true,
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
                      Swal.fire(
                        'Deleted!',
                        'The data has been deleted.',
                        'success'
                      )
                    }
                  })
              }}
              >
                Delete
            </Button>
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
              </>
            );
          }
        }
      }
];

const data = [
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
 ["SNI 103:2017", "Kertas Tisu", "Bekasi", "Pokok", "2021", "OK", "Lorem", "YA"],
];




export default function DataStandar(){
    const [data,setData] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getData()
    },[])

    const getData = async()=>{
        try {
            const res = await request({
                url: '/public',
                method: 'GET',
            },false)
            console.log(res);
            setData(
                res.data.data.map((item)=>{
                    return[
                        item.standar,
                        item.judul,
                        item.kategori,
                        item.tahun,
                        item.status,
                        item.deskripsi
                    ]
                })
            )
        } catch (error) {
            console.log(error);
        }
    }

    const options = {
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
        selectableRows: false, // <===== will turn off 
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