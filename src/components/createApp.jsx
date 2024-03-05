import React, { useEffect } from 'react';
import Heading from '../utils/heading';
import { Box } from '@mui/material';

const CreateApp = ({ setDisabled }) => {
	useEffect(() => {
		setDisabled(false);
	}, [setDisabled]);

	return (
		<Box height={'40vh'}>
			<Heading
				text={'قم بإنشاء تطبيقك الخاص'}
				subText="إضغط التالي"
			/>
		</Box>
	);
};

export default CreateApp;
