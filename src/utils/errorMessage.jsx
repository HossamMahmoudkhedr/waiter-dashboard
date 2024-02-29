import { Typography } from '@mui/material';
import React from 'react';

const ErrorMessage = ({ message }) => {
	return (
		<Typography
			variant="caption"
			sx={{ color: '#ff3333', fontSize: '0.9rem' }}>
			{message}
		</Typography>
	);
};

export default ErrorMessage;
