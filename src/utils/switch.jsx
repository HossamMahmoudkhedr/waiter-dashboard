import { Box, Stack } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

const Switch = ({ toggleSwitch, targetActions, index, parentIndex }) => {
	const dispatch = useDispatch();
	const handleClick = () => {
		if (index !== undefined && parentIndex !== undefined) {
			dispatch(
				targetActions.toggleSwitchValue({
					parentIndex,
					index,
				})
			);
		} else {
			dispatch(targetActions.toggleSwitchValue());
		}
	};
	return (
		<Stack
			onClick={handleClick}
			direction="row"
			sx={{
				width: '56px',
				height: '32px',
				borderRadius: '2rem',
				backgroundColor: toggleSwitch ? 'var(--primary-color)' : 'var(--white)',
				padding: '0.25rem',
				cursor: 'pointer',
				position: 'relative',
				boxShadow: toggleSwitch ? 'unset' : 'var(--gray-shadow)',
			}}>
			<Box
				sx={{
					position: 'absolute',
					left: '4px',
					top: '4px',
					width: '24px',
					height: '24px',
					borderRadius: '50%',
					backgroundColor: toggleSwitch
						? 'var(--white)'
						: 'var(--gray-lighter)',
					transform: toggleSwitch ? 'translateX(0%)' : 'translateX(100%)',
					transition: 'all 0.2s ease-in-out',
				}}></Box>
		</Stack>
	);
};

export default Switch;
