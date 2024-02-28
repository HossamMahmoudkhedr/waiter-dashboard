import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import DeviceFrame from '../utils/deviceFrame';
import Switch from '../utils/switch';
import Heading from '../utils/heading';
import { useDispatch, useSelector } from 'react-redux';
import NavLinksPreview from './navLinksPreview';
import { tabsActions } from '../store/tabs-slice';
import Tab from '../utils/tab';
import BarPreview from './barPreview';
import { dataActions } from '../store/data-slice';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Tabs = () => {
	const tabs = useSelector((state) => state.tabs.tabs);
	const showSearchBar = useSelector((state) => state.tabs.showSearchBar);
	const dispatch = useDispatch();
	const subTabs = useSelector(
		(state) => state.tabs.tabs.filter((tab) => tab.id === 4)[0].subTabs
	);

	useEffect(() => {
		dispatch(dataActions.addData({ key: 'tabs', value: tabs }));
		dispatch(
			dataActions.addData({ key: 'showSearchBar', value: showSearchBar })
		);
	}, [tabs, showSearchBar, dispatch]);

	const moveTab = (result) => {
		if (!result.destination) return;
		const draggedTab = tabs[result.source.index];
		const reorderedTabs = Array.from(tabs);
		reorderedTabs.splice(result.source.index, 1);
		reorderedTabs.splice(result.destination.index, 0, draggedTab);
		dispatch(tabsActions.reOrderTabs(reorderedTabs));
	};

	const moveSubTab = (result) => {
		if (!result.destination) return;
		const draggedTab = subTabs[result.source.index];
		const reorderedTabs = Array.from(subTabs);
		reorderedTabs.splice(result.source.index, 1);
		reorderedTabs.splice(result.destination.index, 0, draggedTab);
		dispatch(tabsActions.reOrderSubTabs(reorderedTabs));
	};

	return (
		<Grid
			container
			spacing={{ xs: 6, lg: 2 }}
			sx={{ justifyContent: 'space-between', width: { xs: '100%' } }}>
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
					<DragDropContext onDragEnd={moveTab}>
						<Droppable droppableId="tabs">
							{(provided) => (
								<Stack
									{...provided.droppableProps}
									ref={provided.innerRef}
									component="ul"
									sx={{
										gap: '0.5rem',
										width: { xs: '100%', lg: '85%' },
										alignItems: 'flex-end',
									}}>
									{tabs.map((tab, index) => {
										return (
											<React.Fragment key={tab.id}>
												<Tab
													index={index}
													name={tab.name}
													icon={tab.icon}
													id={tab.id}
												/>
												{tab.subTabs && (
													<DragDropContext onDragEnd={moveSubTab}>
														<Droppable droppableId="subTabs">
															{(provided) => (
																<Stack
																	{...provided.droppableProps}
																	ref={provided.innerRef}
																	component="ul"
																	sx={{
																		gap: '0.5rem',
																		width: '80%',
																		alignItems: 'flex-end',
																	}}>
																	{tab.subTabs.map((subTab, index) => (
																		<React.Fragment key={subTab.id}>
																			<Tab
																				index={index}
																				name={subTab.name}
																				icon={subTab.icon}
																				id={subTab.id}
																			/>
																		</React.Fragment>
																	))}

																	{provided.placeholder}
																</Stack>
															)}
														</Droppable>
													</DragDropContext>
												)}
											</React.Fragment>
										);
									})}
									{provided.placeholder}
								</Stack>
							)}
						</Droppable>
					</DragDropContext>
				</Stack>
			</Grid>
			<Grid
				item
				paddingLeft={{
					xs: '0px !important',
					md: '48px',
					lg: '16px !important',
				}}
				sx={{ justifyContent: 'center', display: 'flex' }}
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
