import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import RegisterForm from '../../views/RegisterForm/RegisterForm';
import { useState } from 'react';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
};

export default function RegisterModal({ openRegister, handleRegisterModal }) {
	return (
		<div>
			<Button
				onClick={handleRegisterModal}
				sx={{
					my: 2,
					color: 'white',
					display: 'block',
					backgroundColor: '#e7876d',
				}}
			>
				REGISTER
			</Button>
			<Modal
				open={openRegister}
				onClose={handleRegisterModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<RegisterForm />
				</Box>
			</Modal>
		</div>
	);
}
