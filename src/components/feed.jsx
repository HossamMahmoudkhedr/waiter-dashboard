import { Box, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import TopContentSkeleton from '../utils/topContentSkeleton';
import BannerSkeleton from '../utils/bannerSkeleton';
import SquareImagesSkeleton from '../utils/squareImagesSkeleton';
import { useSelector } from 'react-redux';

const Feed = ({ chosenItemIndex, mobileNavRef }) => {
	const bannerRef = useRef(null);
	const squareImagesRef = useRef(null);
	const [transform, setTransform] = useState('translateY(0)');
	const chosenItems = useSelector((state) => state.items.items);

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
				setTransform(`translateY(${pixels * 0.2 - pixels}px)`);
			} else if (
				chosenItems[chosenItemIndex].id === 1 &&
				transform !== 'translateY(0)'
			) {
				let pixels = getSpacebetween(mobileNavRef, bannerRef);
				setTransform(`translateY(-${pixels - 15}px)`);
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
				<Box ref={bannerRef}>
					<BannerSkeleton />
				</Box>
				<Box ref={squareImagesRef}>
					<SquareImagesSkeleton />
				</Box>
			</Stack>
		</Box>
	);
};

export default Feed;
