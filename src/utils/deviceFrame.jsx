import { Box, Stack } from '@mui/material';
import React from 'react';
import { icons } from './icons';
import Feed from '../components/feed';
import NavSkeleton from './navSkeleton';
import NavLinksSkeleton from './navLinksSkeleton';
import MobileFrame from './mobileFrame';

const DeviceFrame = ({ barComponent, navLinksComponent, chosenItemIndex }) => {
	return (
		<Box sx={{ width: 'fit-content' }}>
			<MobileFrame>
				<Box
					sx={{
						width: '100%',
						height: '100%',
						backgroundColor: 'var(--body-background-color)',
					}}>
					<Stack
						direction="row"
						sx={{
							justifyContent: 'space-between',
							padding: ' 0.5rem 0.8rem',
							backgroundColor: 'white',
							position: 'relative',
							zIndex: 1,
						}}>
						<Box component="span">{icons.rightSide}</Box>
						<Box component="span">{icons.leftSide}</Box>
					</Stack>
					<Stack
						gap={'1rem'}
						width="100%">
						<Box width="100%">{barComponent || <NavSkeleton />}</Box>
						{chosenItemIndex !== undefined && (
							<Feed chosenItemIndex={chosenItemIndex} />
						)}
						{chosenItemIndex === undefined && <Feed />}
					</Stack>
				</Box>
				{navLinksComponent || <NavLinksSkeleton />}
			</MobileFrame>
		</Box>
	);
};

export default DeviceFrame;
