import { CustomCellRendererProps } from 'ag-grid-react'
import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Chip } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ResumeLink(params: CustomCellRendererProps) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <>
            
            <Chip label='View' variant='outlined' size='small' onClick={handleOpen} color='primary'/>

            {
                open && (
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
                                <div >
                                   
                                    <Viewer fileUrl={params.value} plugins={[defaultLayoutPluginInstance]} />
                                </div>
                            </Worker>
                        </Box>
                    </Modal>
                )
            }

        </>
    )
}

export default ResumeLink