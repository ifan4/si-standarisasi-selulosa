import Layout from "../../component/layout/mainLayout";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

export default function Index(props){

    return(
        <Layout title={'Dashboard'} role={'Validator'}>
            <h1>Welcome to Validator Dashboard!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem corporis laborum in ratione neque libero vitae ipsam quod veniam? Quibusdam numquam debitis quaerat sed reiciendis ullam nesciunt doloribus, id soluta.</p>
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 200,
                },
            }}
            >
                
                
                
                
            </Box>

            <Grid container spacing={2}>
                <Grid xs={12} md={4}>
                    <VarCard title={'Total Data Standar'} />
                </Grid>
                <Grid xs={12} md={4}>
                    <VarCard title={'Data Validated'} />
                </Grid>
                <Grid xs={12} md={4}>
                    <VarCard title={'Data Need Validate'} />
                </Grid>
            </Grid>
        </Layout>
    )
}


const VarCard = ({title,value})=>{
    return(
        <Paper elevation={3} 
        sx={{ 
            textAlign: 'center',
            paddingBottom: '40px',
            paddingTop: '5px'
        }}>
            <h4>{title}</h4>
            <div>20</div>
        </Paper>
    )
}