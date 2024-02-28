import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { icons } from './icons';

const Tab = ({ name, icon, index, id }) => {
	return (
		<Draggable
			style={{ width: '100%' }}
			key={`${id}`}
			draggableId={`${id}`}
			index={index}>
			{(provided) => (
				<Box
					width={'100%'}
					key={`${id}`}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}>
					<Stack
						direction="row"
						sx={{ alignItems: 'center', gap: '0.5rem' }}>
						<Box
							component={'span'}
							sx={{ cursor: 'grab', height: '24px' }}>
							{icons.move}
						</Box>
						<Stack
							component="li"
							direction="row"
							sx={{
								gap: '0.5rem',
								backgroundColor: 'var(--white)',
								padding: '0.75rem 1rem',
								borderRadius: '0.75rem',
								alignItems: 'center',
								width: '100%',
								userSelect: 'none',
							}}>
							<Box
								component="span"
								height="20px"
								sx={{ userSelect: 'none' }}>
								{icons.dots}
							</Box>
							<Box
								component="span"
								height="20px">
								{icons[icon]}
							</Box>
							<Typography
								variant="body1"
								sx={{
									fontWeight: '500',
									color: 'var(--gray-darker)',
									fontSize: '14px',
									userSelect: 'none',
								}}>
								{name}
							</Typography>
						</Stack>
					</Stack>
				</Box>
			)}
		</Draggable>
	);
};

export default Tab;
