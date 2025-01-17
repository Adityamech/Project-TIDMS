import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';


const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const { window } = props;
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
        <Image src={"/Group.svg"} height={80} width={175} alt='Logo' style={{ marginLeft: "1px", marginTop: "-19px", marginBottom:'-10px' }}/>
      </Toolbar>
      <Divider sx={{ height: '1.5px', backgroundColor: '#538151' }} />

      <List>
        {['Dashboard', 'Employee', 'Stock', 'Orders', 'Sales'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => router.push("/" + text.toLowerCase())}>
            <ListItemButton
              style={{
                backgroundColor: pathname.startsWith("/" + text.toLowerCase()) ? "#538151" : "",
                color: pathname.startsWith("/" + text.toLowerCase()) ? "#ffffff" : "#708090"
              }}
            >
              <ListItemIcon style={{ color: pathname.startsWith("/" + text.toLowerCase()) ? "#ffffff" : "#708090" }}>
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { sm: `${drawerWidth}px` }
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
            {pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2)}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="logout"
            edge="end"
            onClick={() => {
              router.push('/')
              // Add your logout logic here
            }}
            sx={{
              ml: 'auto',
              display: { sm: 'flex' },
              fontSize: 'large',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              },
              '& .MuiIconButton-label': {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              },
            }}
          >
            Logout
            <LogoutOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth ,borderRight: '2px solid #538151',borderTop: '2px solid #538151',borderLeft: '2px solid #538151',borderBottom: '2px solid #538151'}
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <main>{children}</main>
      </Box>
    </Box>
  );
}
