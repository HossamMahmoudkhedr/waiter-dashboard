import { Box, Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddButton from '../utils/addButton';
import { useDispatch, useSelector } from 'react-redux';
import 'react-device-frameset/styles/marvel-devices.min.css';
import { icons } from '../utils/icons';
import { screensActions } from '../store/screens-slice';
import StartingScreensSettings from './startingScreensSettings';
import MobileFrame from '../utils/mobileFrame';
import { dataActions } from '../store/data-slice';

const settings = [<StartingScreensSettings />];
const StartingScreens = () => {
	// This useState is responsible for making items active
	const [chosenItemIndex, setChosenItemIndex] = useState(-1);

	// Set settings content
	const [settingsContent, setSettingsContent] = useState(null);

	// Get the chosen items from the list
	const chosenItems = useSelector((state) => state.screens.screens);

	// Get avaliable items
	const items = useSelector((state) => state.screens.availableScreens);

	//Get Images
	const images = useSelector((state) => state.screenImages.screenImages);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			dataActions.addData({ key: 'startingScreenItems', value: chosenItems })
		);
	}, [chosenItems.length]);
	return (
		<Grid
			container
			spacing={2}
			sx={{ justifyContent: 'space-between' }}>
			<Grid
				item
				lg={3}
				md={chosenItems.length === 0 ? 12 : 6}
				xs={12}>
				<AddButton
					chosenItems={chosenItems}
					chosenItemIndex={chosenItemIndex}
					items={items}
					dispatch={dispatch}
					setChosenItemIndex={setChosenItemIndex}
					setSettingsContent={setSettingsContent}
					targetActions={screensActions}
				/>
			</Grid>
			<Grid
				item
				xs={12}
				md={chosenItems.length === 0 ? 12 : 6}
				lg={4.5}>
				{settings[settingsContent]}
			</Grid>
			<Grid
				item
				sx={{ justifyContent: 'center', display: 'flex' }}
				xs={12}
				lg={4.5}>
				<Box sx={{ width: 'fit-content' }}>
					<MobileFrame>
						<Box
							sx={{
								width: '100%',
								height: '100%',
								backgroundColor: 'var(--gray-lighter)',
								backgroundImage: `url(${images[0]})`,
								backgroundPosition: 'center',
								backgroundSize: 'cover',
							}}>
							<Stack
								direction="row"
								sx={{
									justifyContent: 'space-between',
									padding: ' 0.5rem 0.8rem',
									backgroundColor: 'transparent',
									position: 'relative',
									zIndex: 1,
								}}>
								<Box component="span">{icons.rightSide}</Box>
								<Box component="span">{icons.leftSide}</Box>
							</Stack>
						</Box>
					</MobileFrame>
				</Box>
			</Grid>
		</Grid>
	);
};

export default StartingScreens;
