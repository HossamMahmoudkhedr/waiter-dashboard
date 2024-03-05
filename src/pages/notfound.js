import { Box } from '@mui/material';
import React from 'react';
import Heading from '../utils/heading';

const Notfound = () => {
	return (
		<Box height="70vh">
			<Heading
				text="هذة الصفحة غير موجودة"
				subText='من فضلك اذهب الى "صانع التطبيقات" '
			/>
		</Box>
	);
};

export default Notfound;
