"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { ReactNode } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { alignProperty } from '@mui/material/styles/cssUtils';
import MenuIcon from '@mui/icons-material/Menu';




const drawerWidth = 240;

interface Props {

  window?: () => Window;
  children: ReactNode;
}

export default function Layout(props: Props) {
  const { window } = props;
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  console.log('pathname',pathname);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Image src={"/Group.svg"} height={40} width={125} alt='Logo' style={{ marginLeft: "25px", marginTop: "5px" }}/>
      </Toolbar>
      <Divider />

      <List >
        {['Dashboard', 'Employee', 'Stock', 'Orders', 'Sales'].map((text, index) => (
          <ListItem key={text} disablePadding

           onClick={() => { 
           router.push("/" + text.toLowerCase());
           
          }}
          >
            <ListItemButton style={{ color: pathname.startsWith("/" + text.toLowerCase())
           ? "#538151" : "#708090"}}>
              <ListItemIcon  style={{ color: pathname.startsWith("/" + text.toLowerCase())
           ? "#538151" : "#708090"}}>
                {index === 0 && <HomeOutlinedIcon />}
                {index === 1 && <PersonOutlineOutlinedIcon />}
                {index === 2 && <SpaOutlinedIcon />}
                {index === 3 && <LocalMallOutlinedIcon />}
                {index === 4 && <CurrencyRupeeOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: 'linear-gradient(to right, #588158, #CFDEB1)', 
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
          },
          marginLeft: {
            sm: `${drawerWidth}px`, 
          },
        }}
      >
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
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
      
        sx={{
            width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
        
      >
        <Drawer
          container={container}          
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth},
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
          <main>{props.children}</main>
      </Box>
    </Box>
  );
}
