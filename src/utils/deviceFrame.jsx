import { Box, Stack } from '@mui/material';
import React from 'react';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';
import { icons } from './icons';
import Feed from '../components/feed';
import NavSkeleton from './navSkeleton';
import NavLinksSkeleton from './navLinksSkeleton';

const DeviceFrame = ({
	navComponent,
	navLinksComponent,
	chosenItemIndex,
	mobileNavRef,
}) => {
	return (
		<Box sx={{ width: 'fit-content' }}>
			<DeviceFrameset
				device="iPhone X"
				height={'733px'}
				width={{ xs: '356px', lg: '365px' }}
				style={{
					position: 'relative',
				}}>
				<Box
					sx={{
						width: '99%',
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
						{/* {chosenItems.map((el) => {
								if (el.def === 'banner') {
									return <div>Banner</div>;
								}
							})} */}
						<Box
							width="100%"
							ref={mobileNavRef}>
							{navComponent || <NavSkeleton />}
						</Box>
						{chosenItemIndex !== undefined && mobileNavRef !== undefined && (
							<Feed
								chosenItemIndex={chosenItemIndex}
								mobileNavRef={mobileNavRef}
							/>
						)}
						{chosenItemIndex === undefined && mobileNavRef === undefined && (
							<Feed />
						)}
					</Stack>
				</Box>
				{navLinksComponent || <NavLinksSkeleton />}
			</DeviceFrameset>
		</Box>
	);
};

export default DeviceFrame;
