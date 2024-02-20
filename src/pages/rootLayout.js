import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/sideBar';
import { Box, Stack, Typography } from '@mui/material';
import { icons } from '../utils/icons';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import store from '../store';

const StyledInput = styled.input`
	border: none;
	outline: none;
	font-size: 1rem;
	&::placeholder {
		color: var(--gray-lighter);
	}
`;

const RootLayout = () => {
	return (
		<Provider store={store}>
			<div className="App">
				<Box
					sx={{
						width: '80%',
						float: 'left',
						backgroundColor: 'var(--body-background-color)',
						borderRadius: '2rem',
						padding: '2rem',
						margin: '1rem',
					}}>
					<Stack
						direction={{ xs: 'column', md: 'row' }}
						sx={{
							alignItems: 'center',
							justifyContent: 'space-between',
							paddingBottom: '2rem',
						}}>
						<Stack
							direction="row"
							sx={{
								alignItems: 'center',
								gap: '0.5rem',
								padding: '1rem',
								backgroundColor: 'var(--white)',
								borderRadius: '1rem',
								boxShadow: 'var(--gray-shadow)',
							}}>
							{icons.search}
							<StyledInput
								type="text"
								placeholder="بحث..."
							/>
						</Stack>
						<Stack
							direction="row"
							sx={{ gap: '1.5rem', alignItems: 'center' }}>
							<Box
								sx={{
									backgroundColor: 'var(--white)',
									borderRadius: '50%',
									padding: '0.5rem',
									width: '40px',
									height: '40px',
									position: 'relative',
									boxShadow: 'var(--gray-shadow)',
									cursor: 'pointer',
								}}>
								{icons.bell}
								<Stack
									component="span"
									sx={{
										position: 'absolute',
										right: '-8px',
										top: '-8px',
										backgroundColor: 'var(--primary-color)',
										color: 'white',
										width: '20px',
										height: '20px',
										borderRadius: '50%',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: '10px',
										fontWeight: '600',
									}}>
									4
								</Stack>
							</Box>
							<Stack
								direction="row"
								sx={{ alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
								<Box>
									<img
										style={{ objectFit: 'cover' }}
										src={require('../assets/images/Profile image.png')}
										alt="username"
									/>
								</Box>
								<Typography variant="body1">أشرف ماهر</Typography>
								<span style={{ height: '24px' }}>{icons.arrowDown}</span>
							</Stack>
						</Stack>
					</Stack>
					<Box padding={'2rem 0 4rem 0'}>
						<Outlet />
					</Box>
				</Box>
				<Box
					sx={{
						width: '20%',
						float: 'right',
						position: 'fixed',
						top: '0',
						right: '0',
					}}>
					<SideBar />
				</Box>
			</div>
		</Provider>
	);
};

export default RootLayout;
