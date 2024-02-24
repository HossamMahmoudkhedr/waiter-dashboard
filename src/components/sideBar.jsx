import { Box, Stack } from '@mui/material';
import { Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../utils/constants';
import { icons } from '../utils/icons';

const SideBar = ({ setShowSideBar }) => {
	return (
		<Box
			sx={{
				margin: { xs: 'unset', lg: '1.5rem 1rem' },
				padding: { xs: '3rem 0', lg: 'unset' },
				backgroundColor: 'var(--white)',
				position: { xs: 'relative', lg: 'usnet' },
			}}>
			<Box
				component={'button'}
				onClick={() => {
					setShowSideBar(false);
				}}
				sx={{
					lineHeight: 'unset',
					minWidth: 'unset',
					padding: '0',
					position: 'absolute',
					left: '1.5rem',
					top: '1.5rem',
					backgroundColor: 'transparent',
					border: 'none',
					outline: 'none',
					cursor: 'pointer',
					display: { xs: 'block', lg: 'none' },
				}}>
				<Box component="span">{icons.closeMenu}</Box>
			</Box>
			<Stack component="ul">
				{navLinks.map((el, i) => (
					<Box
						key={i}
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
