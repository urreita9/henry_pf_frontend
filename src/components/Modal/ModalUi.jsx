import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #F29278',
	boxShadow: 24,
	p: 4,
	borderRadious: '10px',
};

export const ModalUi = ({ modalOpen, setModalOpen, id, loading }) => {
	//   const [open, setOpen] =useState(false);
	const navigate = useNavigate();
	// const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setModalOpen(false);
		// navigate(`/caretaker/${id}`);
	};

	return (
		<div>
			{/* <Button onClick={handleOpen}>Open modal</Button> */}
			<Modal
				open={modalOpen}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					{loading ? (
						<CircularProgress />
					) : (
						<>
							<Typography id='modal-modal-title' variant='h6' component='h2'>
								Congratulations!
							</Typography>
							<Typography id='modal-modal-description' sx={{ mt: 2 }}>
								You are now officially a pet host.
							</Typography>
						</>
					)}
				</Box>
			</Modal>
		</div>
	);
};
