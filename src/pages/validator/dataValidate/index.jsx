import Layout from "../../../component/layout/mainLayout";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import { request } from "../../../utils/axios-utils";
import { Box } from "@mui/material";
import { convertStatus, convertStatusToColor } from "../../../helper";

const columns = [
    {
        name: "Standar",
        options: {
            filter: true,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <Link 
                    style={{ 
                        color: 'blue',
                        textDecoration: 'none'
                     }}>
                        {value}
                    </Link>
                );
              }
        },
    }, 
    {
        name: "Judul",
        options: {
            filter: true,
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
      name: "Berlaku",
      options: {
          filter: false,
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
        name: "Baca",
        options: {
            filter: false,
            customBodyRender: (value)=>{
              return(
                <a href={`http://sisis.ifandri.com/${value}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outlined">
                    Lihat
                  </Button>
                </a>
              )
          }
        }
    }, 
    {
      name: "Status Validasi",
      options: {
          filter: true,
          customBodyRender: (value)=>{
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
        name: "Validate",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            if (value.validasi_status == 1 || value.validasi_status == 2){
              return<>Validated</>
            }
            return (
              <>
              <Button 
              variant="outlined" 
              color="error" 
              size="small" 
              sx={{ margin: '2px' }}
              onClick={()=>{
                Swal.fire({
                    title: 'Are you sure want to reject this data?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                      validatingData(value.id,tableMeta.tableData,value.setData,'2')
                    }
                  })
              }}
              >
                NO
            </Button>
              <Button 
              variant="contained" 
              color="success" 
              size="small" 
              sx={{ margin: '2px' }}
              onClick={()=>{
                Swal.fire({
                    title: 'Are you sure want to accept this data?',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                      validatingData(value.id,tableMeta.tableData,value.setData,'1')
                    }
                  })
              }}
              >
                YES
            </Button>
              </>
            );
          }
        }
      }
];

const validatingData = async (id,data,setData,status)=>{
  try {
      const res = await request({
          url: `/validator/validating/${id}/${status}`,
          method: 'POST'
      })
      console.log('response res');
      console.log(res);
      let filteredData = data.map((d)=> {
        if(d[7].id === id){
          if(status == '1'){
            d[6] = "1"
            d[7].validasi_status = '1'
          }
          else if(status == '2'){
            d[6] = "2"
            d[7].validasi_status = '2'
          }
        }
          return d;
      })
      setData(filteredData)
      
      return Swal.fire(
          'Accepted!',
          'The data has been accepted.',
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
        selectableRows: false, // <===== will turn off 
    };
    
    useEffect(()=>{
      getData()
    },[])

    const getData = async()=>{
      try {
          const res = await request({
              url: '/validator',
              method: 'GET'
          })
          console.log(res);
          setData(
              res.data.data.map((item)=>{
                  return[
                      item.standar,
                      item.judul,
                      item.kategori,
                      item.tahun,
                      item.status,
                      item.link,
                      item.validasi_status,
                      {
                        id: item.id,
                        data: data,
                        setData: setData,
                        validasi_status: item.validasi_status
                      },
                  ]
              })
          )
      } catch (error) {
          console.log(error);
      }
  }

    return(
        <Layout 
        title={'Data Validate Request Management'}
        role={'Validator'}
        >

            <MUIDataTable
            title={"Data Standar"}
            data={data}
            columns={columns}
            options={options}
            />

        </Layout>
    )
}