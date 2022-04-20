import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  display:"flex",
  flexDirection:"column",
  alignItems:"start",
  // justifyContent:"center",
  bgcolor: 'white',
  // color:"white",
  border: '2px solid black',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({open,setOpen,title,body,task}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={()=>setOpen(prevstate=>!prevstate)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Social Media App
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1,fontSize:"20px" }}>
           {body}
          </Typography>
          <Stack sx={{mt:2,mb:-2 }} direction="row" spacing={5}>
          <Button onClick={()=>setOpen(prevstate=>!prevstate)} size='small' variant='contained' color="secondary">No</Button>
          <Button onClick={task} sx={{color:"white"}} size='small' variant='contained' color="primary">Yes</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
