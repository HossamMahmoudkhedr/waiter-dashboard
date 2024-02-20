import React from 'react';
import Heading from '../utils/heading';
import { Stack } from '@mui/material';

const StaticProductsSettings = () => {
	return (
		<Stack sx={{ gap: '1rem' }}>
			<Heading
				text="المنتجات"
				subText="سوف يتم إضافة كل المنتجات"
			/>
		</Stack>
	);
};

export default StaticProductsSettings;
