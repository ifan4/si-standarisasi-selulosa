import { useEffect,useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ReactDOM from 'react-dom/client';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TableChartIcon from '@mui/icons-material/TableChart';
import { Link } from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root')
  );

export default function Index({drawerWidth,handleDrawerToggle,mobileOpen}){
    const [onHighlight, setOnHighlight] = useState('Dashboard')

    const drawer = (
        <div>
          <Toolbar>
            <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Grid2 marginRight={'23px'}> 
                    <img src="../logo-sis.png" alt="" width={'37px'}/>
                </Grid2>
                <Grid2>
                    <Typography 
                    sx={{ 
                        fontSize:'14px', 
                        letterSpacing:'2px', 
                        lineHeight:'18px',
                        fontWeight:'bold',
                        color: 'dark'
                        }}>
                        STANDARISASI SELULOSA
                    </Typography>
                </Grid2>
            </Box>
          </Toolbar>
          <Divider />
          <List>
            {[
                {
                    label: 'Dashboard',
                    icon: <DashboardIcon/>,
                    link: '/admin'
                }, 
                {
                    label: 'Data Standar',
                    icon: <TableChartIcon/>,
                    link: '/admin/dataStandar'
                },
                {
                  label: 'Users Management',
                  icon: <ManageAccountsIcon/>,
                  link: '/admin/usersManagement'
                }
              ].map((text, index) => {
                    return(
                        (
                            <Link to={text.link} style={{ textDecoration: 'none', color:'inherit' }}>
                              <ListItem key={index} disablePadding>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      {text.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text.label}/>
                                  </ListItemButton>
                              </ListItem>
                            </Link>
                          )
                    )
                })}
          </List>
          <Divider />
          <List>
            {[
              {
                label: 'My Profile',
                icon: <AccountCircleIcon/>
              },
            ].map((text, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText primary={text.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      );

      
  const container = document.w !== undefined ? () => window().document.body : undefined;


    return(
        <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    )
}