import { Box, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import TopContentSkeleton from '../utils/topContentSkeleton';
import BannerSkeleton from '../utils/bannerSkeleton';
import SquareImagesSkeleton from '../utils/squareImagesSkeleton';
import { useSelector } from 'react-redux';
import StaticProductsPreview from './staticProductsPreview';

const Feed = ({ chosenItemIndex }) => {
	const bannerRef = useRef(null);
	const squareImagesRef = useRef(null);
	const staticProductsRef = useRef(null);
	const [transform, setTransform] = useState('translateY(0)');
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

	useEffect(() => {
		if (chosenItems[chosenItemIndex]) {
			if (chosenItemIndex === 0) {
				setTransform(`translateY(0px)`);
			} else if (chosenItemIndex === 1) {
				setTransform(`translateY(-30%)`);
			} else if (chosenItemIndex === 2) {
				setTransform(`translateY(-55%)`);
			}
		}
	}, [chosenItemIndex, chosenItems]);

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				transform: transform,
				transition: 'all 0.3s ease-in-out',
			}}>
			<TopContentSkeleton />
			<Stack sx={{ margin: '0 0.75rem', gap: '1rem' }}>
				{chosenItems.map((item, i) => (
					<Box key={i}>{content[item.def]}</Box>
				))}
			</Stack>
		</Box>
	);
};

export default Feed;
