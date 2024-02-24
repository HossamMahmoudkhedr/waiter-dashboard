import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/sideBar';
import { Box, Button, Stack, Typography } from '@mui/material';
import { icons } from '../utils/icons';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import store from '../store';

const StyledInput = styled.input`
	border: none;
	outline: none;
	font-size: 1rem;
	width: 100%;
	&::placeholder {
		color: var(--gray-lighter);
	}
`;

const RootLayout = () => {
	const [showSideBar, setShowSideBar] = useState(false);
	const handleSideBar = () => {
		setShowSideBar(true);
	};
	return (
		<Provider store={store}>
			<div className="App">
				<Box
					sx={{
						width: { xs: 'auto', lg: '80%' },
						float: { xs: 'unset', lg: 'left' },
						backgroundColor: 'var(--body-background-color)',
						borderRadius: { xs: 'unset', lg: '2rem' },
						padding: { xs: '1.25rem 0rem', lg: '2rem' },
						margin: { xs: 'unset', lg: '1rem' },
					}}>
					<Stack
						direction={{ xs: 'column-reverse', md: 'row' }}
						sx={{
							alignItems: { xs: 'flex-start', lg: 'center' },
							justifyContent: 'space-between',

							padding: { xs: '0rem 1rem 2rem 1rem', lg: '0rem 0rem 2rem 0rem' },
							gap: { xs: '2rem', lg: 'unset' },
						}}>
						<Stack
							direction="row"
							sx={{ gap: '3.25rem', alignItems: 'center' }}>
							<Box
								component={'button'}
								onClick={handleSideBar}
								sx={{
									display: { xs: 'block', lg: 'none' },
									lineHeight: 'unset',
									minWidth: 'unset',
									padding: '0',
									backgroundColor: 'transparent',
									border: 'none',
									outline: 'none',
									cursor: 'pointer',
								}}>
								<Box component="span">{icons.menu}</Box>
							</Box>
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
								<Box
									component="span"
									width={'24px'}
									height="24px">
									{icons.search}
								</Box>
								<StyledInput
									type="text"
									placeholder="بحث..."
								/>
							</Stack>
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
						width: { xs: '100%', lg: '20%' },
						float: { xs: 'unset', lg: 'right' },
						position: 'fixed',
						top: '0',
						right: '0',
						transform: {
							xs: `translateX(${showSideBar ? '0' : '200%'})`,
							lg: 'unset',
						},
						transition: 'all 0.2s ease-in-out',
						zIndex: '99',
					}}>
					<SideBar setShowSideBar={setShowSideBar} />
				</Box>
			</div>
		</Provider>
	);
};

export default RootLayout;
