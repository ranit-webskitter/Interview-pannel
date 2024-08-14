import React from 'react';
import { Chip } from '@mui/material'; 
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
const StatusCellRender = (params:any) => {
  return (
    <>
    
    {params?.value == 'true' ? <CheckCircleIcon style={{color:'green'}}/> : <CancelIcon style={{color:'red'}}/>}
    </>
  );
};

export default StatusCellRender