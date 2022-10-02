import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {useEffect,useState} from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { request } from '../../utils/axios-utils';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { convertRole } from '../../helper';


const drawerWidth = 240;

export default function Index({handleDrawerToggle,title,role}) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const [profile,setProfile] = useState({
    name: '',
    role: ''
  })
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{
    getProfile()
  },[])

  const logoutHandler = async()=>{
    console.log(Cookies.get('accessToken'));
    console.log('Berhasil LOGOUT');
    Cookies.remove('accessToken')
    navigate('/')
  }

  const getProfile = async ()=>{
    try {
      const res = await request({
        url: '/profile',
        method: 'get'
      })
      console.log('res.data profile');
      console.log(res.data);
      setProfile({
        name: res.data.name,
        role: convertRole(res.data.role)
      })
    } catch (error) {
      
    }
  }

    return(
        <AppBar
        position="fixed"
        variant="elevation"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: role == 'Admin' ? '#1976D2' : '#19C7D2'
        }}
      >
        <Toolbar
        sx={{ 
          display: 'flex',
          justifyContent: 'space-between'
         }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <div>
            <Button
            color="inherit"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ 
              textAlign: 'right',
              flexDirection: 'column',
              alignItems: 'end'
            }}
            >
              <div>{profile.name}</div>
              <Typography 
              sx={{ 
                display:'block',
                fontSize: '10px',
                fontStyle: 'oblique'
              }}>
                {profile.role}
              </Typography>

            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose} sx={{ paddingX: '30px' }}>
                <Link to={'/profile'} style={{ textDecoration: 'none', color: 'inherit' }}>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={logoutHandler} sx={{ paddingX: '30px' }}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    )
}