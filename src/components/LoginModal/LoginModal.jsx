import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { LoginForm } from '../../views/LoginForm/LoginForm';
import { useState } from 'react';
// import RegisterModal from "../RegisterModal/RegisterModal";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
};

export default function LoginModal({ openLogin, handleLoginModal }) {
	return (
		<div>
			<Button
				onClick={handleLoginModal}
				sx={{
					my: 2,
					color: 'white',
					display: 'block',
					backgroundColor: '#e7876d',
				}}
			>
				LOGIN
			</Button>
			<Modal
				open={openLogin}
				onClose={handleLoginModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<LoginForm />
				</Box>
			</Modal>
		</div>
	);
}
