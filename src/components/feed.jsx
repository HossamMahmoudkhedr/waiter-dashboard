import { Box, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import TopContentSkeleton from '../utils/topContentSkeleton';
import BannerSkeleton from '../utils/bannerSkeleton';
import SquareImagesSkeleton from '../utils/squareImagesSkeleton';
import { useSelector } from 'react-redux';
import StaticProductsPreview from './staticProductsPreview';

const Feed = ({ chosenItemIndex, mobileNavRef }) => {
	const bannerRef = useRef(null);
	const squareImagesRef = useRef(null);
	const staticProductsRef = useRef(null);
	const [transform, setTransform] = useState(0);
	const chosenItems = useSelector((state) => state.items.items);

	const content = {
		banner: (
			<Box ref={bannerRef}>
				<BannerSkeleton />
			</Box>
		),
		squareImages: (
			<Box ref={squareImagesRef}>
				<SquareImagesSkeleton />
			</Box>
		),
		staticProducts: (
			<Box ref={staticProductsRef}>
				<StaticProductsPreview />
			</Box>
		),
	};

	const getSpacebetween = (firstElement, secondElement) => {
		const rect1 = firstElement.current.getBoundingClientRect();
		const rect2 = secondElement.current.getBoundingClientRect();
		const pixelsBetween = rect2.top - rect1.bottom;

		return pixelsBetween;
	};

	useEffect(() => {
		if (chosenItems[chosenItemIndex]) {
			if (chosenItems[chosenItemIndex].id === 3) {
				let pixels = getSpacebetween(mobileNavRef, squareImagesRef);
				setTransform(`translateY(-${pixels * 0.9}px)`);
			} else if (chosenItems[chosenItemIndex].id === 1 && transform !== 0) {
				let pixels = getSpacebetween(mobileNavRef, bannerRef);
				setTransform(`translateY(-${pixels * 0.9}px)`);
			} else if (chosenItems[chosenItemIndex].id === 2) {
				let pixels = getSpacebetween(mobileNavRef, staticProductsRef);
				setTransform(`translateY(-${pixels * 0.9}px)`);
			}
		}
	}, [chosenItemIndex]);

	return (
		<Box
			sx={{
				width: '100%',
				transform: transform,
				transition: 'all 0.3s ease-in-out',
			}}>
			<TopContentSkeleton />
			<Stack sx={{ margin: '0 0.75rem', gap: '1rem' }}>
				{chosenItems.map((item) => content[item.def])}
			</Stack>
		</Box>
	);
};

export default Feed;
