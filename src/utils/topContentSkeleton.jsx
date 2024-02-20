import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const TopContentSkeleton = () => {
	return (
		<Stack sx={{ gap: '1rem' }}>
			<Skeleton
				variant="rounded"
				width="40%"
				height={20}
				animation={false}
				sx={{ margin: '1.2rem 0.75rem 0 0', borderRadius: '0.5rem' }}
			/>
			<Stack
				direction="row"
				sx={{ margin: '0 0.75rem 1.2rem 0', gap: '0.5rem' }}>
				<Skeleton
					width={40}
					height={20}
					variant="rounded"
					animation={false}
					sx={{ borderRadius: '2rem' }}
				/>
				<Skeleton
					width={50}
					height={20}
					variant="rounded"
					animation={false}
					sx={{ borderRadius: '2rem' }}
				/>
				<Skeleton
					width={45}
					height={20}
					variant="rounded"
					animation={false}
					sx={{ borderRadius: '2rem' }}
				/>
				<Skeleton
					width={50}
					height={20}
					variant="rounded"
					animation={false}
					sx={{ borderRadius: '2rem' }}
				/>
				<Skeleton
					width={40}
					height={20}
					variant="rounded"
					animation={false}
					sx={{ borderRadius: '2rem' }}
				/>
				<Skeleton
					width={60}
					height={20}
					variant="rounded"
					animation={false}
					sx={{ borderRadius: '2rem' }}
				/>
			</Stack>
		</Stack>
	);
};

export default TopContentSkeleton;
