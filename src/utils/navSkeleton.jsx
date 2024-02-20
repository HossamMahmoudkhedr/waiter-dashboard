import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const NavSkeleton = () => {
	return (
		<Stack
			sx={{
				gap: '1rem',
				padding: ' 0.5rem 0.8rem',
				backgroundColor: 'white',
				position: 'relative',
				zIndex: 1,
			}}>
			<Stack
				direction="row"
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
					gap: '1rem',
				}}>
				<Skeleton
					variant="circular"
					width={19}
					height={19}
					animation={false}
				/>
				<Stack sx={{ gap: '0.2rem', alignItems: 'start', width: '70%' }}>
					<Skeleton
						variant="rounded"
						width={'30%'}
						height={18}
						animation={false}
					/>
					<Skeleton
						variant="rounded"
						width={'100%'}
						height={10}
						animation={false}
					/>
				</Stack>
				<Skeleton
					variant="rounded"
					width={60}
					height={15}
					animation={false}
				/>
			</Stack>
			<Skeleton
				variant="rounded"
				width="100%"
				height={43}
				animation={false}
			/>
		</Stack>
	);
};

export default NavSkeleton;
