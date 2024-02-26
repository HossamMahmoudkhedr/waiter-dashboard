import React from 'react';
import { icons } from './icons';
import { Box, Stack, Typography } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';

const Item = ({
	index,
	chosenItemIndex,
	icon,
	name,
	handleRemoveItem,
	activeItem,
	moveItem,
}) => {
	const [, drag] = useDrag({
		type: 'LIST_ITEM',
		item: { index, activeItem },
	});

	const [, drop] = useDrop({
		accept: 'LIST_ITEM',
		hover(item) {
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			// item.activeItem(dragIndex);

			moveItem(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	return (
		<Box
			key={index}
			ref={drop}>
			<Stack
				ref={drag}
				key={index}
				direction="row"
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '0.75rem 1rem',
					backgroundColor:
						chosenItemIndex === index ? 'var(--primary-color)' : 'var(--white)',
					borderRadius: '0.75rem',
					cursor: 'pointer',
				}}>
				<Stack
					onClick={() => {
						activeItem(index);
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
							fill: chosenItemIndex === index ? 'white' : '#344054',
							stroke: chosenItemIndex === index ? 'white' : '#344054',
							strokeWidth: '0.5px',
						}}>
						{icon}
					</Box>
					<Typography
						variant="body1"
						sx={{
							color:
								chosenItemIndex === index
									? 'var(--white)'
									: 'var(--gray-darker)',
							fontWeight: '500',
						}}>
						{name}
					</Typography>
				</Stack>
				<Box
					component="span"
					onClick={() => {
						handleRemoveItem(index);
					}}
					sx={{
						height: '24px',
						stroke: chosenItemIndex === index ? 'var(--white)' : '#344054',

						position: 'relative',
						zIndex: '2',
					}}>
					{icons.close}
				</Box>
			</Stack>
		</Box>
	);
};

export default Item;
