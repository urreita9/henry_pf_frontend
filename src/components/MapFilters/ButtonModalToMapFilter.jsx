import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';

import { ButtonMapFilter } from './ButtonFilter';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ButtonModalToMapFilter = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <IconButton onClick={handleOpen} size='large' sx={{
        position: 'absolute',
        zIndex: '500',
        left: '10px',
        bottom: '10px',
        backgroundColor: '#F29278'

    }} >
        <FilterAltIcon />
    </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <ButtonMapFilter handleCloseModal={handleClose}/>
        </Box>
      </Modal>
    </>
  );
}