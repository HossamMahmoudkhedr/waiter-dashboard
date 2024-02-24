import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { icons } from '../utils/icons';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const StyledInput = styled.input`
	border: none;
	outline: none;
	background-color: transparent;
	font-size: 12px;
	&::placeholder {
		color: var(--gray-light);
	}
`;

const MobileNavPreview = () => {
	const showSearchBar = useSelector((state) => state.tabs.showSearchBar);
	return (
		<Stack
			sx={{
				gap: '1rem',
				backgroundColor: 'white',
				padding: '12px',
			}}>
			<Stack
				direction="row"
				sx={{
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
				<Stack
					direction="row"
					sx={{
						gap: '0.5rem',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<Box component="span">{icons.location}</Box>
					<Stack direction="column">
						<Typography
							variant="body1"
							sx={{
								fontSize: '12px',
								fontWeight: '700',
								color: 'var(--black)',
							}}>
							حي الرفاع
						</Typography>
						<Typography
							variant="body1"
							sx={{
								fontSize: '10px',
								fontWeight: '400',
								color: 'var(--gray-color)',
							}}>
							4239 سعد بن مالك رضي الله عنه, حي الرفاع...
						</Typography>
					</Stack>
				</Stack>
				<Stack
					direction="row"
					sx={{ gap: '0.25rem', alignItems: 'center' }}>
					<Typography
						variant="body1"
						sx={{
							fontSize: '9px',
							fontWeight: '400',
							color: 'var(--gray-color)',
						}}>
						حدد موقعك
					</Typography>
					<Box
						component="span"
						sx={{ width: '10px' }}>
						{icons.arrowDown}
					</Box>
				</Stack>
			</Stack>
			<Box>
				{showSearchBar && (
					<Stack
						direction="row"
						sx={{
							padding: '12px',
							borderRadius: '12px',
							backgroundColor: 'var(--body-background-color)',
							justifyContent: 'space-between',
						}}>
						<StyledInput
							type="text"
							placeholder="إبحث عن منتج ما ..."
							disabled
						/>
						<Box
							component="span"
							sx={{ width: '15px' }}>
							{icons.search}
						</Box>
					</Stack>
				)}
			</Box>
		</Stack>
	);
};

export default MobileNavPreview;
