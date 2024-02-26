import { Stack, Typography } from '@mui/material';
import React from 'react';

const Heading = ({ text, subText }) => {
	return (
		<Stack sx={{ gap: '1rem', color: 'var(--gray-color)' }}>
			<Typography
				variant="h3"
				sx={{ fontSize: '1.5rem', fontWeight: '700' }}>
				{text}
			</Typography>
			{subText && (
				<Typography
					variant="body1"
					sx={{ fontSize: '1rem' }}>
					{subText}
				</Typography>
			)}
		</Stack>
	);
};

export default Heading;
