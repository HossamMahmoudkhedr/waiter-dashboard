import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

const BannerPreview = ({ bannerImages }) => {
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
		<>
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
								key={i}
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
		</>
	);
};

export default BannerPreview;
