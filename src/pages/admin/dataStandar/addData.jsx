import Layout from "../../../component/layout/mainLayout";
import { TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Unstable_Grid2';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function AddDataStandar(){


    return(
        <Layout title={"Data Standar Management"}>
            <Typography sx={{ marginBottom:'10px' }}>Add Data Standar</Typography>
            <Grid container spacing={3} >
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Standar</InputLabel>
                        <Input
                            
                        />
                    </FormControl>
                </Grid>
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Judul</InputLabel>
                        <Input
                            
                        />
                    </FormControl>
                </Grid>
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        >
                        <MenuItem value={10}>SNI Produk</MenuItem>
                        <MenuItem value={20}>Cara Uji</MenuItem>
                        <MenuItem value={30}>Ekolabel</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Tahun</InputLabel>
                        <Input
                         type="number" min="1900" max="2099" step="1"
                        />
                    </FormControl>
                </Grid>
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                        <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Berlaku" />
                            <FormControlLabel value="male" control={<Radio />} label="Tidak" />
                    </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Link</InputLabel>
                        <Input
                            
                        />
                    </FormControl>
                </Grid>
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Deskripsi Singkat</InputLabel>
                        <Input
                            
                        />
                    </FormControl>
                </Grid>
                <Grid md={6}>
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <FormLabel id="demo-row-radio-buttons-group-label">Dokumen</FormLabel>
                        <Input hidden accept="image/*" multiple type="file" />
                        
                    </FormControl>
                </Grid>
                <Grid md={6}>
                    <Button variant="outlined" color="error" sx={{ marginRight: '5px' }}>
                        Reset
                    </Button>
                    <Button variant="contained">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Layout>
    )
}