import React from 'react';
import { icons } from './icons';
import { Box, Stack, Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';

const Item = ({
	index,
	chosenItemIndex,
	icon,
	name,
	handleRemoveItem,
	activeItem,
	chosenItems,
	id,
}) => {
	return (
		<Draggable
			draggableId={`${id}`}
			index={index}>
			{(provided) => (
				<Stack
					key={`${id}`}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					direction="row"
					sx={{
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '0.75rem 1rem',
						backgroundColor:
							chosenItemIndex === index
								? 'var(--primary-color)'
								: 'var(--white)',
						borderRadius: '0.75rem',
						cursor: 'pointer',
					}}>
					<Stack
						onClick={() => {
							activeItem(index);
						}}
						direction="row"
						sx={{ gap: '0.5rem', alignItems: 'center', width: '100%' }}>
						<Box
							component="span"
							height="16px"
							sx={{ cursor: 'grab' }}>
							{icons.dots}
						</Box>
						<Box
							component="span"
							sx={{
								height: '24px',
								fill: chosenItemIndex === index ? 'white' : '#344054',
								stroke: chosenItemIndex === index ? 'white' : '#344054',
								strokeWidth: '0.2px',
							}}>
							{icons[icon]}
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
					{chosenItems[index].def !== 'staticProducts' && (
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
					)}
				</Stack>
			)}
		</Draggable>
	);
};

export default Item;
