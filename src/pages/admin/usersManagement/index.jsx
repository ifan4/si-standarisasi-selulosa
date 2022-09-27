import Layout from "../../../component/layout/mainLayout";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


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