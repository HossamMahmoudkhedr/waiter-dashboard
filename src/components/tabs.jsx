import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import DeviceFrame from '../utils/deviceFrame';
import Switch from '../utils/switch';
import Heading from '../utils/heading';
import { useDispatch, useSelector } from 'react-redux';
import NavLinksPreview from './navLinksPreview';
import { tabsActions } from '../store/tabs-slice';
import Tab from '../utils/tab';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BarPreview from './barPreview';

const Tabs = () => {
	const tabs = useSelector((state) => state.tabs.tabs);
	const showSearchBar = useSelector((state) => state.tabs.showSearchBar);
	// const otherTab = tabs.filter((tab) => tab.id === 4);
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
			sx={{
				justifyContent: 'space-between',
				width: { xs: '100%' },
			}}>
			<Grid
				item
				lg={3}
				md={6}
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
				md={6}
				xs={12}
				sx={{
					paddingLeft: { xs: 'unset', md: '48px' },
					paddingTop: { xs: 'unset', md: '48px' },
				}}>
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
							<React.Fragment key={i}>
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
												<DndProvider
													backend={HTML5Backend}
													key={i}>
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
									)}
							</React.Fragment>
						))}
					</Stack>
				</Stack>
			</Grid>
			<Grid
				item
				paddingLeft={{
					xs: '0px !important',
					md: '48px',
					lg: '16px !important',
				}}
				sx={{
					justifyContent: 'center',
					display: 'flex',
				}}
				lg={4.5}
				xs={12}>
				<DeviceFrame
					barComponent={<BarPreview />}
					navLinksComponent={<NavLinksPreview />}
				/>
			</Grid>
		</Grid>
	);
};

export default Tabs;
