import Layout from "../../../component/layout/mainLayout";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

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
        name: "City",
        options: {
            filter: false
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
        name: "Validate",
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
                    title: 'Are you sure want to reject this data?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire(
                        'Rejected!',
                        'The data has been rejected.',
                        'success'
                      )
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
                      Swal.fire(
                        'Accepted!',
                        'The data has been accepted.',
                        'success'
                      )
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
    const navigate = useNavigate()

    const options = {
        selectableRows: false, // <===== will turn off 
    };

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