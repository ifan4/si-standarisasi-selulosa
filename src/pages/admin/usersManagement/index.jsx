import Layout from "../../../component/layout/mainLayout";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../../../utils/axios-utils";
import { convertDate, convertRole } from "../../../helper";
import Swal from "sweetalert2";
import Cookies from "js-cookie";


const columns = [
    {
        name: "Name",
        options: {
            filter: false,
        }
    }, 
    {
        name: "EMAIL",
        options: {
            filter: false,
            sort: false,
        }
    }, 
    {
        name: "Role",
        options: {
            filter: true,
        }
    }, 
    {
        name: "CREATED AT",
        options: {
            filter: false,
            sort: false,
        }
    }, 
    {
        name: "ACTION",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
              <Button variant="contained" color="error" size="small" sx={{ margin: '2px' }}
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
              >Delete</Button>
              <Link to={'edit?id='+value.id} style={{ textDecoration: 'none' }}>
                <Button variant="outlined" size="small" sx={{ margin: '2px' }}>Edit</Button>
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
            url: '/admin/user/' + id,
            method: 'POST'
        })
        let filteredData = data.filter((d)=> {
            return d[4].id !== id && d;
        })
        console.log('filteredData');
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

    const options = {
        customToolbar: () => {
        return (
            <Button 
            variant="contained"
            onClick={()=>navigate('add')}
            >
                Add User
            </Button>
        );
        },
        selectableRows: false, // <===== will turn off 
        responsive: 'standard',
        download: false,
        print: false,
        viewColumns: false
    };

    useEffect(()=>{
        getData()
        if (!Cookies.get('accessToken')){
            navigate('/')
        }
    },[])



    

    const getData = async()=>{
        try {
            const res = await request({
                url: '/admin/users',
                method: 'GET'
            })

            console.log('berhasil');
            console.log(res.data.data);

            setData(
                res.data.data.map((item)=>{
                    return[
                        item.name,
                        item.email,
                        convertRole(item.role),
                        convertDate(item.created_at),
                        {
                            id: item.id,
                            data: data,
                            setData: setData
                        }
                    ]
                })
            )
            
        } catch (error) {
            console.log('Gagal');
            console.log(error);
        }
    }

    return(
        <Layout title={'Users Management'}>
              
            <MUIDataTable
            title={"Users List"}
            data={data}
            columns={columns}
            options={options}
            />

        </Layout>
    )
}