import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import 'react-device-frameset/styles/marvel-devices.min.css';
import { useDispatch, useSelector } from 'react-redux';
import BannerSettings from './bannerSettings';
import StaticProductsSettings from './staticProductsSettings';
import SquareImagesSettings from './squareImagesSettings';
import AddButton from '../utils/addButton';
import { itemsActions } from '../store/items-slice';
import DeviceFrame from '../utils/deviceFrame';
import NavLinksPreview from './navLinksPreview';
import BarPreview from './barPreview';
import { dataActions } from '../store/data-slice';

const MainPage = () => {
	// This useState is responsible for making items active
	const [chosenItemIndex, setChosenItemIndex] = useState(-1);

	// Set settings content
	const [settingsContent, setSettingsContent] = useState(null);

	// Get the chosen items from the list
	const chosenItems = useSelector((state) => state.items.items);

	// Get avaliable items
	const items = useSelector((state) => state.items.availableItems);

	const dispatch = useDispatch();

	const settings = {
		banner: (
			<BannerSettings
				currentBanner={chosenItems[chosenItemIndex]}
				chosenItemIndex={chosenItemIndex}
			/>
		),
		staticProducts: <StaticProductsSettings />,
		squareImages: <SquareImagesSettings />,
	};

	useEffect(() => {
		dispatch(dataActions.addData({ key: 'chosenItems', value: chosenItems }));
	}, [chosenItems.length, chosenItems, dispatch]);

	return (
		<Grid
			container
			spacing={2}
			sx={{ justifyContent: 'space-between' }}>
			<Grid
				item
				xs={12}
				md={chosenItems.length === 0 ? 12 : 6}
				lg={3}>
				<AddButton
					items={items}
					chosenItems={chosenItems}
					dispatch={dispatch}
					chosenItemIndex={chosenItemIndex}
					setChosenItemIndex={setChosenItemIndex}
					setSettingsContent={setSettingsContent}
					targetActions={itemsActions}
				/>
			</Grid>
			<Grid
				item
				xs={12}
				md={chosenItems.length === 0 ? 12 : 6}
				lg={4.5}>
				<Stack>{settings[settingsContent]}</Stack>
			</Grid>
			<Grid
				item
				sx={{ justifyContent: 'center', display: 'flex' }}
				xs={12}
				lg={4.5}>
				<DeviceFrame
					chosenItemIndex={chosenItemIndex}
					navLinksComponent={<NavLinksPreview />}
					barComponent={<BarPreview />}
				/>
			</Grid>
		</Grid>
	);
};

export default MainPage;
