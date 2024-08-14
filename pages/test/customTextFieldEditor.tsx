

// import React, { useState, useEffect } from 'react';
// import {useEditMutation} from "@/api/hooks/interviewSchedule";
// import { updateInterviewEventData } from "@/api/functions/interviewScheduleFunc";
// import { send } from 'process';
// import { TextField } from '@mui/material';




// const formatDateForInput = (date: Date | string) => {
//   if (!date) return '';
//   const d = new Date(date);
//   return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}T${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`;
// };


// const CustomTextFieldEditor = (props:any) => {
//   console.log(props,'props')
//   const [value, setValue] = useState(props.value || '');
//   const mutation  = useEditMutation();
//   // console.log('from custom date',formatDateForInput(props.data?.Interview?.toDate().toISOString()))
  
//   useEffect(() => {
   
//     // setValue(new Date(props.value) || '');
//     setValue(formatDateForInput(props.data?.Interview?.toDate().toISOString()))
//   }, [props.value]);

//   const onValueChange = (event: { target: { value: any; }; }) => {

//     setValue(event.target.value);
    
  
//   }
//   // console.log('val',value)
//   const onKeyDown = (event:any) => {
//   console.log('event',event)

//     if (event.key === 'Enter') {
//       const editedDate=new Date(value)
//       console.log('before mutate date Edit', editedDate)
//       props.stopEditing();
//       mutation.mutate( {
//         id: props.data.id,
//         title: props.data.Name,
//         interviewDate: value,
//       })
//       props.value.updateValue(value)
     
//     } else if (event.key === 'Escape') {
//       props.stopEditing(true);
//     }
//   };


//   return (
//     <input
//       type="datetime-local"
//       value={value}
//       onChange={onValueChange}
//       onKeyDown={onKeyDown}
//     />
//   );
// };

// export default CustomTextFieldEditor;




// import React, { useState, useEffect } from 'react';
// import { useEditMutation } from '@/api/hooks/interviewSchedule';
// import { formatISO } from 'date-fns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import dayjs from 'dayjs';

// const CustomTextFieldEditor = (props: any) => {
//   const [value, setValue] = useState<dayjs.Dayjs | null>(null);
//   const mutation = useEditMutation();

//   useEffect(() => {
//     if (props.data?.Interview) {
//       setValue(dayjs(props.data.Interview.toDate().toISOString()));
//     }
//   }, [props.data]);

//   const onValueChange = (newValue: dayjs.Dayjs | null) => {
//     setValue(newValue);
//   };

//   const onDateChange = () => {
//     if (value) {
     
//       props.stopEditing();
//       mutation.mutate({
//         id: props.data.id,
//         title: props.data.Name,
//         interviewDate: value.toDate(),
//       });
//     }
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateTimePicker
//         value={value}
//         onChange={onValueChange}
//         onAccept={onDateChange}
//         sx={{
//           '& .MuiInputBase-input': {
//             color: 'white', 
//             padding:'6px'
//           },
//           '& .MuiButtonBase-root': {
//             color: 'white', 
//           },
//           '& .MuiPickersDay-day': {
//             color: 'red', 
//           },
//         }}
//       />
//     </LocalizationProvider>
//   );
// };

// export default CustomTextFieldEditor;


// //I am not able to select am and pm pm is automatically selected and if i try to select am then it auto submitted





import React, { useState, useEffect } from 'react';
import { useEditMutation } from '@/api/hooks/interviewSchedule';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import 'dayjs/locale/en-gb'; 

const CustomTextFieldEditor = (props: any) => {
  const [value, setValue] = useState<dayjs.Dayjs | null>(null);
  const mutation = useEditMutation();

  useEffect(() => {
    if (props.data?.Interview) {
      setValue(dayjs(props.data.Interview.toDate()));
    }
  }, [props.data]);

  const onValueChange = (newValue: dayjs.Dayjs | null) => {
    setValue(newValue);
  };

  const onDateChange = () => {
    if (value) {
       props.stopEditing();
      mutation.mutate({
        id: props.data.id,
        title: props.data.Name,
        interviewDate: value.toDate(),
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DateTimePicker
        value={value}
        onChange={onValueChange}
        onAccept={onDateChange}
        sx={{
          '& .MuiInputBase-input': {
            color: 'white', 
            padding: '6px'
          },
          '& .MuiButtonBase-root': {
            color: 'white', 
          },
          
        }}
        ampm={false} 
      />
    </LocalizationProvider>
  );
};

export default CustomTextFieldEditor;

