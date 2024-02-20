import { Box, Skeleton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const BannerSkeleton = () => {
	const bannerImages = useSelector((state) => state.banner.bannerImages);
	const [viewedImage, setviewedImage] = useState(0);

	useEffect(() => {
		if (bannerImages.length > 1) {
			const intervalId = setInterval(() => {
				setviewedImage((prevViewedImage) =>
					prevViewedImage < bannerImages.length - 1 ? prevViewedImage + 1 : 0
				);
			}, 3000);

			return () => clearInterval(intervalId);
		}
	}, [bannerImages.length]);

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
			{bannerImages.length === 1 && (
				<img
					style={{ width: '100%', objectFit: 'cover', height: '100%' }}
					src={bannerImages[0]}
					alt=""
				/>
			)}
			{bannerImages.length > 1 && (
				<Stack
					direction="row"
					sx={{ position: 'relative', height: '100%' }}>
					{bannerImages.map((image, i) => (
						<img
							key={i}
							style={{
								width: '100%',
								objectFit: 'cover',
								height: '100%',
								position: 'absolute',
								left: 0,
								top: 0,
								transform:
									i === viewedImage
										? 'translateX(0)'
										: i > viewedImage
										? 'translateX(-100%)'
										: 'translateX(100%)',
								transition: 'all 0.3s ease-in-out',
							}}
							src={image}
							alt=""
						/>
					))}
					<Stack
						direction="row"
						sx={{
							gap: '0.2rem',
							alignItems: 'center',
							position: 'absolute',
							left: '50%',
							transform: 'translateX(-50%)',
							bottom: '15px',
							zIndex: '2',
						}}>
						{bannerImages.map((el, i) => (
							<Box
								onClick={() => {
									setviewedImage(i);
								}}
								sx={{
									width: '6px',
									height: '6px',
									borderRadius: '50%',
									backgroundColor: viewedImage === i ? 'white' : '#ffffff80',
									cursor: 'pointer',
								}}></Box>
						))}
					</Stack>
				</Stack>
			)}
		</Box>
	);
};

export default BannerSkeleton;
