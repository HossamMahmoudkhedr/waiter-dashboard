import { Box, Stack } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../utils/constants';

const SideBar = () => {
	return (
		<Box sx={{ margin: '1.5rem 1rem' }}>
			<Stack component="ul">
				{navLinks.map((el) => (
					<Box
						component="li"
						sx={{ padding: '0.75rem 1.5rem' }}>
						<NavLink
							to={`/${el.navi}`}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
							}}>
							<span>{el.icon}</span>
							<span style={{ marginBottom: '0.4rem' }}>{el.name}</span>
						</NavLink>
					</Box>
				))}
			</Stack>
		</Box>
	);
};

export default SideBar;
