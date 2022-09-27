import {useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from '../sidebar';
import Toolbar from '@mui/material/Toolbar';
import Header from '../header'

const drawerWidth = 240;
export default function Layout({children,title}) {
  const [mobileOpen, setMobileOpen] = useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header
      drawerWidth={drawerWidth}
      handleDrawerToggle={handleDrawerToggle} 
      title={title}
      />

      <Sidebar
      drawerWidth={drawerWidth}
      handleDrawerToggle={handleDrawerToggle} 
      mobileOpen={mobileOpen}
      />
      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

