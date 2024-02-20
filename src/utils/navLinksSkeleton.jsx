import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

const NavLinksSkeleton = () => {
	return (
		<Box
			sx={{
				position: 'absolute',
				left: 0,
				bottom: 0,
				backgroundColor: 'var(--white)',
				width: '100%',
				zIndex: 1,
			}}>
			<Stack
				direction="row"
				sx={{
					justifyContent: 'space-between',
					borderBottom: '1px solid var(--gray-lighter)',
					padding: '0.5rem 2.5rem',
				}}>
				<Stack sx={{ gap: '0.5rem', alignItems: 'center' }}>
					<Skeleton
						variant="circular"
						width={19}
						height={19}
						animation={false}
					/>
					<Skeleton
						variant="rounded"
						width={30}
						height={13}
						animation={false}
					/>
				</Stack>
				<Stack sx={{ gap: '0.5rem', alignItems: 'center' }}>
					<Skeleton
						variant="circular"
						width={19}
						height={19}
						animation={false}
					/>
					<Skeleton
						variant="rounded"
						width={35}
						height={13}
						animation={false}
					/>
				</Stack>
				<Stack sx={{ gap: '0.5rem', alignItems: 'center' }}>
					<Skeleton
						variant="circular"
						width={19}
						height={19}
						animation={false}
					/>
					<Skeleton
						variant="rounded"
						width={25}
						height={13}
						animation={false}
					/>
				</Stack>
				<Stack sx={{ gap: '0.5rem', alignItems: 'center' }}>
					<Skeleton
						variant="circular"
						width={19}
						height={19}
						animation={false}
					/>
					<Skeleton
						variant="rounded"
						width={30}
						height={13}
						animation={false}
					/>
				</Stack>
			</Stack>
			<Box
				sx={{
					backgroundColor: 'var(--white)',
					width: '100%',
					height: '26px',
				}}></Box>
		</Box>
	);
};

export default NavLinksSkeleton;
