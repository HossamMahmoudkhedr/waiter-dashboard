import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import CustomDesignButton from '../utils/customDesignButton';
import { icons } from '../utils/icons';
// import { Device } from 'react-mobile-device-frames';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';
// import { items } from '../data/itemsData';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from '../store/items-slice';
import NavSkeleton from '../utils/navSkeleton';
import Feed from './feed';
import NavLinksSkeleton from '../utils/navLinksSkeleton';
import BannerSettings from './bannerSettings';
import StaticProductsSettings from './staticProductsSettings';
import SquareImagesSettings from './squareImagesSettings';
import { bannerActions } from '../store/banner-slice';
import { squareActions } from '../store/square-slice';

const StyldStack = styled(Stack)`
	&&:hover {
		background-color: var(--body-background-color);
	}
`;

const settings = [
	<BannerSettings />,
	<StaticProductsSettings />,
	<SquareImagesSettings />,
];

const MainPage = () => {
	// References for list and button elements
	const listRef = useRef(null);
	const buttonRef = useRef(null);
	const mobileNavRef = useRef(null);

	// Toggling list view
	const [show, setShow] = useState(false);

	// This useState is responsible for making items active
	const [chosenItemIndex, setChosenItemIndex] = useState(-1);

	// Set settings content
	const [settingsContent, setSettingsContent] = useState(null);

	// Get the chosen items from the list
	const chosenItems = useSelector((state) => state.items.items);

	// Get avaliable items
	const items = useSelector((state) => state.items.availableItems);

	const dispatch = useDispatch();

	// Toggling list function
	const toggoleList = () => {
		setShow(!show);
	};

	// Adding items from the list to the items list in redux
	const handleClick = (index) => {
		dispatch(itemsActions.addItem(index));

		// This section is responsible to manipulate the activition of the itmes
		if (chosenItemIndex === chosenItems.length - 1) {
			setChosenItemIndex(chosenItemIndex + 1);
		} else {
			setChosenItemIndex(chosenItems.length);
		}
		setSettingsContent(items[index].id - 1);

		// Hide the list after every selection
		setShow(false);
	};

	// Active itmes
	const activeItem = (index) => {
		setChosenItemIndex(index);
		setSettingsContent(chosenItems[index].id - 1);
	};

	// Remove items from the items in redux and reset the active item to the first one
	const handleRemoveItem = (index) => {
		dispatch(itemsActions.removeItem(index));
		setChosenItemIndex(0);
		if (chosenItems.length - 1 === 0) {
			setSettingsContent(null);
		} else if (index === 0) {
			setSettingsContent(chosenItems[1].id - 1);
		} else {
			setSettingsContent(chosenItems[0].id - 1);
		}
		if (chosenItems[index].id === 1) {
			dispatch(bannerActions.resetBanner());
		} else if (chosenItems[index].id === 3) {
			dispatch(squareActions.resetList());
		}
	};

	// Handle any outside click in the document to hide the list
	useEffect(() => {
		document.onclick = (e) => {
			let isInside = false;
			let isIconInside = false;
			if (listRef.current) {
				isInside = listRef.current.contains(e.target);
				isIconInside = buttonRef.current.contains(e.target);
			}

			if (!isInside && e.target !== buttonRef.current && !isIconInside) {
				setShow(false);
			}
		};
	}, []);

	return (
		<Grid
			container
			spacing={2}
			sx={{ justifyContent: 'space-between' }}>
			<Grid
				item
				xs={3}>
				<Stack sx={{ gap: '0.5rem' }}>
					<Stack sx={{ gap: '0.5rem' }}>
						{chosenItems.map((item, i) => (
							<Stack
								direction="row"
								sx={{
									justifyContent: 'space-between',
									alignItems: 'center',
									padding: '0.75rem 1rem',
									backgroundColor:
										chosenItemIndex === i
											? 'var(--primary-color)'
											: 'var(--white)',
									borderRadius: '0.75rem',
									cursor: 'pointer',
								}}>
								<Stack
									onClick={() => {
										activeItem(i);
									}}
									direction="row"
									sx={{ gap: '0.5rem', alignItems: 'center' }}>
									<Box
										component="span"
										height="16px">
										{icons.dots}
									</Box>
									<Box
										component="span"
										sx={{
											height: '24px',
											fill: chosenItemIndex === i ? 'white' : '#344054',
										}}>
										{item.icon}
									</Box>
									<Typography
										variant="body1"
										sx={{
											color:
												chosenItemIndex === i
													? 'var(--white)'
													: 'var(--gray-darker)',
											fontWeight: '500',
										}}>
										{item.name}
									</Typography>
								</Stack>
								<Box
									component="span"
									onClick={() => {
										handleRemoveItem(i);
									}}
									sx={{
										height: '24px',
										stroke: chosenItemIndex === i ? 'var(--white)' : '#344054',
										position: 'relative',
										zIndex: '2',
									}}>
									{icons.close}
								</Box>
							</Stack>
						))}
					</Stack>
					<Box sx={{ position: 'relative' }}>
						<CustomDesignButton
							text={'عنصر جديد'}
							icon={icons.plus}
							iconheight={'24px'}
							border="var(--black)"
							iconstroke={'1px solid var(--gray-darker)'}
							restporps={{ onClick: toggoleList, ref: buttonRef }}
						/>
						<Stack
							ref={listRef}
							sx={{
								padding: '1rem',
								gap: '0.5rem',
								borderRadius: '1rem',
								backgroundColor: 'var(--white)',
								position: 'absolute',
								left: '0',
								top: '113%',
								width: '100%',
								display: show ? 'block' : 'none',
							}}>
							{items.length === 0 && (
								<Typography
									variant="body1"
									sx={{
										color: 'var(--gray-light)',
										fontWeight: '500',
										textAlign: 'center',
									}}>
									لا يمكنك اضافة المزيد من العناصر
								</Typography>
							)}
							{items.length !== 0 &&
								items.map((item, i) => (
									<StyldStack
										key={item.id}
										onClick={() => {
											handleClick(i);
										}}
										direction="row"
										sx={{
											padding: '0.5rem 1rem',
											gap: '0.5rem',
											borderRadius: '0.5rem',
											cursor: 'pointer',
										}}>
										<Box
											component="span"
											sx={{ height: '24px', fill: '#344054' }}>
											{item.icon}
										</Box>
										<Typography
											variant="body1"
											sx={{ color: 'var(--gray-darker)', fontWeight: '500' }}>
											{item.name}
										</Typography>
									</StyldStack>
								))}
						</Stack>
					</Box>
				</Stack>
			</Grid>
			<Grid
				item
				xs={4.5}>
				<Stack>{settings[settingsContent]}</Stack>
			</Grid>
			<Grid
				item
				sx={{ justifyContent: 'center' }}
				xs={4.5}>
				<Box sx={{ width: 'fit-content' }}>
					<DeviceFrameset
						device="iPhone X"
						height={'733px'}
						width={'365px'}
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
							<Stack gap={'1rem'}>
								{/* {chosenItems.map((el) => {
								if (el.def === 'banner') {
									return <div>Banner</div>;
								}
							})} */}
								<Box ref={mobileNavRef}>
									<NavSkeleton />
								</Box>
								<Feed
									chosenItemIndex={chosenItemIndex}
									mobileNavRef={mobileNavRef}
								/>
							</Stack>
						</Box>
						<NavLinksSkeleton />
					</DeviceFrameset>
				</Box>
			</Grid>
		</Grid>
	);
};

export default MainPage;
