import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { icons, reduxIcons } from './icons';

const Tab = ({ name, icon, index, moveTab }) => {
	const [, drag] = useDrag({
		type: 'LIST_ITEM',
		item: { index },
	});

	const [, drop] = useDrop({
		accept: 'LIST_ITEM',
		hover(item) {
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}

			moveTab(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});
	return (
		<Box
			key={index}
			ref={drop}
			sx={{ userSelect: 'none' }}>
			<Stack
				ref={drag}
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
	);
};

export default Tab;
