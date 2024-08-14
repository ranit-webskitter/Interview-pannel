

import React from 'react';
import { useRouter } from 'next/router';
import { Avatar, Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CallIcon from '@mui/icons-material/Call';
import Link from 'next/link';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux-toolkit/slices/userSlice';
import { toast } from 'sonner';
const Index = () => {
  const router = useRouter();
  const dispatch=useDispatch()
  const isActive = (href: string) => {
    return router.pathname === href;
  };

  const getLinkColor = (href: string) => {
    return isActive(href) ? '#0288d1' : 'initial'; 
  };

  const handleLogout = () => {
    router.push('/login');
    dispatch(logout());
     toast.success('Logout successful');
  };

  return (
    <Box
      sx={{
        minHeight: '480px',
        padding: '50px 15px',
        backgroundColor: '#203f5c',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        // height:'100%',
         height: {xs:'100%', xl:'100vh'},
        // marginTop: '3rem',
      }}
    >
        
      <List>
      <Avatar
          alt="R"
          src="/photos/login.svg"
          style={{ width: 240, height: 240, margin: '0 auto', borderRadius: '50%', marginBottom: '2rem' }}
        />
      {/* <img src="/photos/login.svg" style={{borderRadius:'50px',height:'15rem',marginLeft:'12%'}}/> */}
        <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '24px', color: 'white' }}>
        WTS INTERVIEW PANEL
        </Typography>
        <Divider sx={{ bgcolor: 'white', height: 2, margin: '2rem' }} />
        <ListItem button component={Link} href="/interview-schedule" sx={{ color:'white' ,backgroundColor: getLinkColor('/interview-schedule') }}>
          <GroupsIcon sx={{ mr: 1 }} />
          <ListItemText primary="Interview Schedule" sx={{ color:'white'}} />
        </ListItem>
        <ListItem button component={Link} href="/calendar" sx={{ backgroundColor: getLinkColor('/calendar'),marginTop:'2rem'}}>
          <CalendarMonthIcon sx={{ mr: 1, color: 'white' }} />
          <ListItemText primary="Calendar" sx={{  color:'white'  }} />
        </ListItem>
        <ListItem button onClick={handleLogout}  sx={{ marginTop:'2rem'}}>
          <LogoutIcon sx={{ mr: 1, color: 'white' }} />
          <ListItemText primary="Log out" sx={{  color:'white'  }} />
        </ListItem>
        
      </List>
    </Box>
  );
};

export default Index;

