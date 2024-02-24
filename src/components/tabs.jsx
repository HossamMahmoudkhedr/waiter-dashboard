import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import 'react-device-frameset/styles/marvel-devices.min.css';
import { icons } from '../utils/icons';
import DeviceFrame from '../utils/deviceFrame';
import Switch from '../utils/switch';
import MobileNavPreview from './mobileNavPreview';
import Heading from '../utils/heading';
import { useDispatch, useSelector } from 'react-redux';
import NavLinksPreview from './navLinksPreview';
import { tabsActions } from '../store/tabs-slice';
import Tab from '../utils/tab';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Tabs = () => {
	const tabs = useSelector((state) => state.tabs.tabs);
	const showSearchBar = useSelector((state) => state.tabs.showSearchBar);
	const otherTab = tabs.filter((tab) => tab.id === 4);
	const subTabs = useSelector(
		(state) => state.tabs.tabs.filter((tab) => tab.id === 4)[0].subTabs
	);

	const dispatch = useDispatch();
	const moveTab = (dragIndex, hoverIndex) => {
		const draggedTab = tabs[dragIndex];
		const newTabs = [...tabs];
		newTabs.splice(dragIndex, 1);
		newTabs.splice(hoverIndex, 0, draggedTab);
		dispatch(tabsActions.reOrderTabs(newTabs));
	};
	const moveSubTab = (dragIndex, hoverIndex) => {
		const draggedTab = subTabs[dragIndex];
		const newTabs = [...subTabs];
		newTabs.splice(dragIndex, 1);
		newTabs.splice(hoverIndex, 0, draggedTab);
		dispatch(tabsActions.reOrderSubTabs(newTabs));
	};

	return (
		<Grid
			container
			spacing={{ xs: 6, lg: 2 }}
			sx={{ justifyContent: 'space-between' }}>
			<Grid
				item
				lg={3}
				xs={12}>
				<Stack sx={{ gap: '1rem', color: 'var(--gray-color)' }}>
					<Typography
						variant="h3"
						sx={{ fontSize: '1.5rem', fontWeight: '700' }}>
						الشريط العلوي
					</Typography>
					<Stack
						direction="row"
						sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
						<Typography
							variant="body1"
							sx={{ fontSize: '1rem', fontWeight: '500' }}>
							إظهار زر البحث
						</Typography>
						<Switch
							toggleSwitch={showSearchBar}
							targetActions={tabsActions}
						/>
					</Stack>
				</Stack>
			</Grid>
			<Grid
				item
				lg={4.5}
				xs={12}>
				<Stack sx={{ gap: '1rem' }}>
					<Heading text="التبويبات" />

					<Stack
						component="ul"
						sx={{
							gap: '0.5rem',
							width: { xs: '100%', lg: '85%' },
							alignItems: 'flex-end',
						}}>
						{tabs.map((tab, i) => (
							<>
								<DndProvider backend={HTML5Backend}>
									<Box width="100%">
										<Tab
											key={i}
											name={tab.name}
											icon={tab.icon}
											index={i}
											moveTab={moveTab}
										/>
									</Box>
								</DndProvider>
								{tab.subTabs &&
									tab.subTabs.map(
										(subTab, i) =>
											subTab &&
											subTab.icon &&
											subTab.name && (
												<DndProvider backend={HTML5Backend}>
													<Box width={'90%'}>
														<Tab
															key={i}
															name={subTab.name}
															icon={subTab.icon}
															index={i}
															moveTab={moveSubTab}
														/>
													</Box>
												</DndProvider>
											)

										// <Stack
										// 	component="li"
										// 	direction="row"
										// 	sx={{
										// 		gap: '0.5rem',
										// 		backgroundColor: 'var(--white)',
										// 		padding: '0.75rem 1rem',
										// 		borderRadius: '0.75rem',
										// 		alignItems: 'center',
										// 		width: '90%',
										// 	}}>
										// 	<Box
										// 		component="span"
										// 		height="20px">
										// 		{icons.dots}
										// 	</Box>
										// 	<Box
										// 		component="span"
										// 		height="20px">
										// 		{subTab.icon}
										// 	</Box>
										// 	<Typography
										// 		variant="body1"
										// 		sx={{
										// 			fontWeight: '500',
										// 			color: 'var(--gray-darker)',
										// 			fontSize: '14px',
										// 		}}>
										// 		{subTab.name}
										// 	</Typography>
										// </Stack>
									)}
							</>
						))}
					</Stack>
				</Stack>
			</Grid>
			<Grid
				item
				sx={{ justifyContent: 'center', display: 'flex' }}
				lg={4.5}
				xs={12}>
				<DeviceFrame
					navComponent={<MobileNavPreview />}
					navLinksComponent={<NavLinksPreview />}
				/>
			</Grid>
		</Grid>
	);
};

export default Tabs;
