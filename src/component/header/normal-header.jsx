import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../utils/axios-utils';
import Cookies from 'js-cookie';
import axios from 'axios';

const drawerWidth = 240;


function DrawerAppBar(props) {
    const navigate = useNavigate()  
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [role,setRole] = React.useState('public')
    const [linkBantuan,setLinkBantuan] = React.useState('')
    const [fixLink,setFixLink] = React.useState('')
    
    React.useEffect(()=>{
        checkRole()
        getLink()
    })

    const navItems = [
        {
            label: 'Masuk',
            url: '/authentication/login'
        },
        {
            label: 'Bantuan',
            url: fixLink
        },
    ];
    

    const getLink = async()=>{
        try {
            const res = await request({
                url: linkBantuan,
                method: 'GET'
            })
            setFixLink(res.data.data)
        } catch (error) {
            
        }
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logoutHandler = ()=>{
        Cookies.remove('accessToken')
        navigate('/')
    }

    const checkRole = async ()=>{
        try {
            const res = await request({
                url: '/profile',
                method: 'get'
            })

            
            setLinkBantuan('/user/panduan/2')
            setRole('user')
        } catch (error) {
            setLinkBantuan('/public/panduan/0')
            return setRole('public')
        }
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            
        <Typography variant="h6" sx={{ my: 2 }}>
            SI-STANDARD
        </Typography>
        <Divider />
        <List>
            {navItems.map((item) => {
                if (item.label === 'Masuk' && role === 'user'){
                    
                    return(
                        <Link style={{ textDecoration: 'none' }} onClick={logoutHandler}>
                            <ListItem key={item.label} disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={'Logout'} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    )
                }
                if (item.label === 'Bantuan'){
                    
                    return(
                        <a target={'_blank'} href={item.url} style={{ textDecoration: 'none' }} >
                            <ListItem key={item.label} disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        </a>
                    )
                }
                return(
                    <Link to={item.url} style={{ textDecoration: 'none' }}>
                <ListItem key={item.label} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={item.label} />
                    </ListItemButton>
                </ListItem>
            </Link>
            )})}
        </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
        <AppBar component="nav">
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            
            <Box sx={{ flexGrow: 1, display:'flex', alignItems:'center'}}>
                <Grid2 marginRight={'23px'}> 
                    <img src="../logo-sis.png" alt="" width={'37px'}/>
                </Grid2>
                <Grid2>
                    <Link to={'/'} style={{ color: 'inherit',textDecoration: 'none' }}>
                        <Typography 
                        sx={{ 
                            fontSize:'14px', 
                            letterSpacing:'2px', 
                            lineHeight:'18px',
                            fontWeight:'bold',
                            color: 'dark'
                            }}>
                            SI-STANDARD
                        </Typography>
                    </Link>
                </Grid2>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item) => {
                    if (item.label == 'Masuk' && role == "user"){
                        return(
                            <Button key={item.label} sx={{ color: '#fff' }} onClick={logoutHandler}>
                                {'logout'}
                            </Button>
                        )
                    }
                    if (item.label === 'Bantuan'){
                    
                        return(
                            <a target={'_blank'} href={`${process.env.REACT_APP_BASE_URL}/${item.url}`} style={{ textDecoration: 'none' }} >
                                <Button key={item.label} sx={{ color: '#fff' }}>
                                    {item.label}
                                </Button>
                            </a>
                        )
                    }

                    
                    return(
                    <Link to={item.url} style={{ textDecoration: 'none' }}>
                        <Button key={item.label} sx={{ color: '#fff' }}>
                            {item.label}
                        </Button>
                    </Link>
                )})}
            </Box>
            </Toolbar>
        </AppBar>
        <Box component="nav">
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            {drawer}
            </Drawer>
        </Box>
        <Toolbar/>
        </Box>
    );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
