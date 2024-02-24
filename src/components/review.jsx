import { Box } from '@mui/material';
import React from 'react';
import Heading from '../utils/heading';

const Review = () => {
	return (
		<Box
			height="50vh"
			sx={{ padding: { xs: '0rem 1rem', lg: 'unset' } }}>
			<Heading
				text="مراجعة فريق ويتر"
				subText="سيتم مراجعة التطبيق و سيتم إبلاغك بأي ملاحظة أو تعديل قبل رفعه على أبل ستور أو جوجل بلاي."
			/>
		</Box>
	);
};

export default Review;
