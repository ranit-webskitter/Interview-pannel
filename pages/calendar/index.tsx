

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { Container, Typography, Paper, Grid, Modal, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import SideBar from '../../component/SideBar2';
import { EventClickArg } from '@fullcalendar/core';
import useInterviewData from "@/api/hooks/interviewSchedule";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInterviewEventData } from "@/api/functions/interviewScheduleFunc";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import multiMonthPlugin from '@fullcalendar/multimonth'
const CalendarContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  height: "90vh",
  overflow: "auto",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius,
}));

const modalStyle: React.CSSProperties = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  
  padding:'3rem',
  backgroundColor: 'white',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  border: '1px solid #ddd',
};

export default function DemoApp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [editedEvent, setEditedEvent] = useState<any>({});
  const { rowData: eventData,EditEventMutation:mutation } = useInterviewData();
  

 
console.log(eventData)
  const events = eventData?.map((item, index) => ({
     id: item?.id,
    title: item?.Name,
    start: item?.Interview?.toDate().toISOString(),
    backgroundColor: '#3788d8',
  }));

  const handleEventClick = (info: EventClickArg) => {
    setCurrentEvent(info.event);
    setEditedEvent({
      title: info.event.title,
      start: formatDateForInput(info.event.start!),
      backgroundColor: info.event.backgroundColor || '#ffffff',
    });
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSave = async () => {
    try {
      if (currentEvent) {
        const startDate = new Date(editedEvent.start);

        if (isNaN(startDate.getTime())) {
          throw new Error('Invalid date value');
        }

      
        currentEvent.setProp('title', editedEvent.title);
        currentEvent.setStart(startDate.toLocaleString());
        currentEvent.setProp('backgroundColor', editedEvent.backgroundColor);

       
        await mutation.mutateAsync({
          id: currentEvent.id,
          title: editedEvent.title,
          interviewDate: startDate,
        });
      }
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      handleClose();
    }
  };

  const formatDateForInput = (date: Date | string) => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}T${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`;
  };

  return (
    <>
      {/* <Grid container spacing={2} > */}
        {/* <Grid item xs={12} md={3} xl={3}> */}
        <div style={{display:'flex',width:'100%'}}>
          <SideBar />
        {/* </Grid> */}
        {/* <Grid item xs={12} md={9} xl={9} > */}
        <div style={{ flex: '1', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          {events?.length! > 0 && (
            <CalendarContainer>
              <Typography variant="h4" gutterBottom sx={{backgroundColor:'#203f5c',color:'white',padding:'1rem',display:'flex',justifyContent:'center'}}>
                WTS INTERVIEW PANEL
              </Typography>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin,resourceTimelinePlugin,multiMonthPlugin]}
                // initialView="dayGridMonth"
                initialView="multiMonthYear"
                weekends={true}
                events={events}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                nowIndicator={true}
                views={{
                  year: {
                    type: "dayGridYear",
                    titleFormat: { year: "numeric" },
                  },
                }}
              
                eventClick={handleEventClick}
                dayMaxEvents={true}
              />
            </CalendarContainer>
          )}
          </div>
          </div>
        {/* </Grid> */}
      {/* </Grid> */}

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div style={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Edit Event
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="Title"
            value={editedEvent.title || ''}
            onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Start Date"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={editedEvent.start || ''}
            onChange={(e) => setEditedEvent({ ...editedEvent, start: e.target.value })}
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '1rem' }}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
}

function renderEventContent(eventInfo: any) {
  return (
    <>
      <Typography variant="subtitle2" component="b">
        {eventInfo.timeText}
      </Typography>
      <Typography variant="body2">{eventInfo.event.title}</Typography>
    </>
  );
}











