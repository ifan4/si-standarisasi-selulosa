import Layout from "../../../component/layout/mainLayout";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../../../utils/axios-utils";


const columns = [
    {
        name: "Name",
        options: {
            filter: false,
        }
    }, 
    {
        name: "Role",
        options: {
            filter: true,
        }
    }, 
    {
        name: "Created at",
        options: {
            filter: false
        }
    }, 
    {
        name: "Updated at",
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
 ["James Alexander", "Admin", "25 Juni 2022", "27 September 2022"],
 ["Halland Angie", "User", "30 Juni 2022", "23 September 2022"],
];




export default function DataStandar(){
    const [data,setData] = useState([])
    
    console.log('state data');
    console.log(data);
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
        onRowsDelete:(e)=>{console.log(e.data)},
    };

    useEffect(()=>{
        getData()
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
                        item.role,
                        item.created_at,
                        item.email,
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