
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

