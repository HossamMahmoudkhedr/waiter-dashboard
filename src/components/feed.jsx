import { Box, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import TopContentSkeleton from '../utils/topContentSkeleton';
import BannerSkeleton from '../utils/bannerSkeleton';
import SquareImagesSkeleton from '../utils/squareImagesSkeleton';
import { useSelector } from 'react-redux';
import StaticProductsPreview from './staticProductsPreview';

const Feed = ({ chosenItemIndex }) => {
	const [transform, setTransform] = useState('translateY(0)');
	const chosenItems = useSelector((state) => state.items.items);
	const content = {
		squareImages: <SquareImagesSkeleton />,
		staticProducts: <StaticProductsPreview />,
	};

	useEffect(() => {
		if (chosenItems[chosenItemIndex]) {
			switch (chosenItemIndex) {
				case 0:
					setTransform(`translateY(0px)`);
					break;
				case 1:
					setTransform(`translateY(-16%)`);
					break;
				case 2:
					setTransform(`translateY(-33%)`);
					break;
				case 3:
					setTransform(`translateY(-54%)`);
					break;
				case 4:
					setTransform(`translateY(-55%)`);
					break;
				case 5:
					setTransform(`translateY(-66%)`);
					break;
				case 6:
					setTransform(`translateY(-75%)`);
					break;
				default:
					setTransform(`translateY(0px)`);
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
				{chosenItems.map((item, i) => {
					if (item.def === 'banner') {
						return (
							<BannerSkeleton
								key={i}
								bannerImages={item.bannerImages}
							/>
						);
					} else {
						return <Box key={i}>{content[item.def]}</Box>;
					}
				})}
			</Stack>
		</Box>
	);
};

export default Feed;
