import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import CustomDesignButton from './customDesignButton';
import { icons } from './icons';
import { bannerActions } from '../store/banner-slice';
import { squareActions } from '../store/square-slice';
import styled from 'styled-components';
import { screenImagesActions } from '../store/screen-images-slice';
import Item from './item';
import { itemsActions } from '../store/items-slice';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const StyldStack = styled(Stack)`
	&&:hover {
		background-color: var(--body-background-color);
	}
`;

const AddButton = ({
	items,
	chosenItems,
	dispatch,
	chosenItemIndex,
	setChosenItemIndex,
	setSettingsContent,
	targetActions,
}) => {
	// References for list and button elements
	const listRef = useRef(null);
	const buttonRef = useRef(null);

	// Toggling list view
	const [show, setShow] = useState(false);

	// Toggling list function
	const toggoleList = () => {
		setShow(!show);
	};

	// Adding items from the list to the items list in redux
	const handleClick = (index) => {
		dispatch(targetActions.addItem(index));
		// This section is responsible to manipulate the activition of the itmes
		if (chosenItemIndex === chosenItems.length - 1) {
			setChosenItemIndex(chosenItemIndex + 1);
		} else {
			setChosenItemIndex(chosenItems.length);
		}
		setSettingsContent(items[index].def);

		// Hide the list after every selection
		setShow(false);
	};

	// Active itmes
	const activeItem = (index) => {
		setChosenItemIndex(index);
		setSettingsContent(chosenItems[index].def);
	};

	// Remove items from the items in redux and reset the active item to the first one
	const handleRemoveItem = (index) => {
		dispatch(targetActions.removeItem(index));
		setChosenItemIndex(0);
		setSettingsContent(chosenItems[0].def);

		if (chosenItems[index].def === 'banner') {
			dispatch(bannerActions.resetBanner());
		} else if (chosenItems[index].def === 'squareImages') {
			dispatch(squareActions.resetList());
		} else if (chosenItems[index].def === 'screens') {
			dispatch(screenImagesActions.resetScreens());
			setSettingsContent(null);
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

	const moveItem = (result) => {
		if (!result.destination) return;
		const draggedItem = chosenItems[result.source.index];
		const reorderdItems = Array.from(chosenItems);
		reorderdItems.splice(result.source.index, 1);
		reorderdItems.splice(result.destination.index, 0, draggedItem);

		dispatch(itemsActions.reOrderItems(reorderdItems));
		activeItem(result.destination.index);
		setSettingsContent(chosenItems[result.source.index].def);
	};

	return (
		<Stack sx={{ gap: '0.5rem' }}>
			<DragDropContext onDragEnd={moveItem}>
				<Droppable droppableId="items">
					{(Provided) => (
						<Stack
							{...Provided.droppableProps}
							ref={Provided.innerRef}
							sx={{ gap: '0.5rem' }}>
							{chosenItems.map((item, i) => (
								<Item
									index={i}
									icon={item.icon}
									chosenItems={chosenItems}
									chosenItemIndex={chosenItemIndex}
									name={item.name}
									key={item.id}
									handleRemoveItem={handleRemoveItem}
									activeItem={activeItem}
									id={item.id}
								/>
							))}
							{Provided.placeholder}
						</Stack>
					)}
				</Droppable>
			</DragDropContext>
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
						zIndex: '9',
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
									userSelect: 'none',
								}}>
								<Box
									component="span"
									sx={{
										height: '24px',
										fill: '#344054',
										stroke: '#344054',
										strokeWidth: '0.1px',
										userSelect: 'none',
									}}>
									{icons[item.icon]}
								</Box>
								<Typography
									variant="body1"
									sx={{
										color: 'var(--gray-darker)',
										fontWeight: '500',
										userSelect: 'none',
									}}>
									{item.name}
								</Typography>
							</StyldStack>
						))}
				</Stack>
			</Box>
		</Stack>
	);
};

export default AddButton;
