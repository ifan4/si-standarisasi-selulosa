import Layout from "../../../component/layout/mainLayout";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";

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
        name: "Action",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
              <Button variant="contained" color="error" size="small" sx={{ margin: '2px' }}>Delete</Button>
              <Button variant="outlined" size="small" sx={{ margin: '2px' }}>Edit</Button>
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