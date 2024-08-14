import React from 'react';
import { Chip } from '@mui/material'; 
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
const StatusCellRender = (params:any) => {
  return (
    <>
    
    {/* {params?.value == 'true' ? <CheckCircleIcon style={{color:'green'}}/> : <CancelIcon style={{color:'red'}}/>} */}
    {
        params.value === "pending"
          ? <CheckBoxOutlineBlankIcon/>
          : params.value === "selected" || params.value=== 'true'
          ? <CheckCircleIcon style={{color:'#00a76f',marginTop:'5px'}}/>
          : <CancelIcon style={{color:'#c93232',marginTop:'5px'}}/>
      }
    </>
  );
};

export default StatusCellRender