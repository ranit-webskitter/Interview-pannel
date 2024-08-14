



import React, { useState } from 'react';
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
import {
      ChevronLeft,
      ChevronRight,
     
    } from "lucide-react";
const Index = () => {
  const router = useRouter();
  const dispatch=useDispatch()
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    console.log("clicked");
    setCollapsed(!collapsed);
  };
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
        padding: !collapsed ? '50px 15px': " 50px 5px",
       
        backgroundColor: '#203f5c',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        // height:'100%',
         height: {xs:'100%', xl:'100vh'},
          width: collapsed ? "82px" : "350px" 
        // marginTop: '3rem',
      }}
    >
        <button
        
        style={{ marginRight:!collapsed?'0':'0.65rem',display:'flex',cursor:'pointer',marginLeft:!collapsed ?'90%' : '50%',marginBottom:'1rem'}}
        onClick={(e) => {
          e.stopPropagation();
          toggleSidebar();
        }}
      >
        {collapsed ? (
          <ChevronRight  />
        ) : (
          <ChevronLeft />
        )}
      </button>
      <List>
     {!collapsed && <Avatar
          alt="R"
          src="/photos/login.svg"
          style={{ width: 240, height: 240, margin: '0 auto', borderRadius: '50%', marginBottom: '2rem' }}
        />}

        {
            collapsed && <Avatar
            alt="R"
            src="/photos/login.svg"
            style={{ width: 60, height: 60, margin: '0 auto', borderRadius: '50%', marginBottom: '2rem',marginLeft:'8px' }}
          />
        }
       {!collapsed && <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '24px', color: 'white' }}>
        WTS INTERVIEW PANEL
        </Typography>}
        {collapsed && <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '24px', color: 'white',marginLeft:'8px' }}>
        WTS
        </Typography>}
        <Divider sx={{ bgcolor: 'white', height: 2, margin:!collapsed? '2rem':'1rem 0rem'}} />
        <ListItem  component={Link} href="/interview-schedule" sx={{ color:'white' ,backgroundColor: getLinkColor('/interview-schedule'),marginTop: '3rem' }}>
          <GroupsIcon sx={{ mr: 1 ,fontSize:'32px' }} />
          {!collapsed && <ListItemText primary="Interview Schedule" sx={{ color:'white'}} />}
        </ListItem>
        <ListItem button component={Link} href="/calendar" sx={{ backgroundColor: getLinkColor('/calendar'),marginTop:'2rem'}}>
          <CalendarMonthIcon sx={{ mr: 1, color: 'white',fontSize:'32px' }} />
         {!collapsed && <ListItemText primary="Calendar" sx={{  color:'white'  }} />}
        </ListItem>
        <ListItem button onClick={handleLogout}  sx={{ marginTop:'2rem'}}>
          <LogoutIcon sx={{ mr: 1, color: 'white',fontSize:'32px' }} />
         {!collapsed && <ListItemText primary="Log out" sx={{  color:'white'  }} />}
        </ListItem>
        
      </List>
    </Box>
  );
};

export default Index;

