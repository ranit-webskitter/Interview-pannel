import { CustomCellRendererProps } from 'ag-grid-react'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from "@mui/icons-material/Delete";
import {useDeleteMutationHook} from "@/api/hooks/interviewSchedule";
export default function AlertDialog(params: CustomCellRendererProps) {

  const mutation  = useDeleteMutationHook();


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} sx={{color:'#ff5630'}}>
      <DeleteIcon/>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' >Close</Button>
          <Button  onClick={() => {mutation.mutate(params?.data?.id);}} autoFocus variant='contained' style={{backgroundColor:'#ff5630'}}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
