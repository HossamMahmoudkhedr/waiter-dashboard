import React from 'react';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import BannerPreview from '../components/bannerPreview';

const BannerSkeleton = () => {
	const bannerImages = useSelector((state) => state.banner.bannerImages);

	return (
		<Box
			height={'192px'}
			width="100%"
			sx={{ borderRadius: '0.5rem', overflow: 'hidden', position: 'relative' }}>
			{bannerImages.length > 0 && (
				<Box
					sx={{
						position: 'absolute',
						background: 'linear-gradient(95deg, transparent , #000000a8 95%)',
						width: '100%',
						height: '100%',
						zIndex: '1',
					}}>
					<Stack sx={{ padding: '1.1rem', width: '55%', gap: '1rem' }}>
						<Typography
							variant="body1"
							sx={{
								color: 'white',
								fontWeight: 'bold',
								fontSize: '18.5px',
							}}>
							أشهى وألذ الاطباق بين يديك الآن.
						</Typography>
						<button
							style={{
								color: 'white',
								border: '1.5px solid white',
								padding: '0.5rem 0.8rem',
								backgroundColor: 'transparent',
								outline: 'none',
								borderRadius: '0.7rem',
								fontWeight: '500',
							}}>
							إكتشف ألذ الاطباق
						</button>
					</Stack>
				</Box>
			)}
			{bannerImages.length === 0 && (
				<Skeleton
					width={'100%'}
					height={'100%'}
					variant="rounded"
					animation={false}
				/>
			)}
			{bannerImages.length >= 1 && <BannerPreview />}
		</Box>
	);
};

export default BannerSkeleton;
