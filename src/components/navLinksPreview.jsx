import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { reduxIcons } from '../utils/icons';

// The links in the bottom of the mobile app screen
const NavLinksPreview = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [showSubTabs, setSubTabs] = useState(false);
	const tabs = useSelector((state) => state.tabs.tabs);
	const handleClick = (i) => {
		setActiveTab(i);
		if (tabs[i].id === 4) {
			setSubTabs(!showSubTabs);
		}
	};
	return (
		<Stack
			direction="row"
			sx={{
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '0.5rem 3rem 26px',
				position: 'absolute',
				bottom: '0',
				left: '0',
				zIndex: 1,
				width: '100%',
				backgroundColor: 'white',
			}}>
			{tabs.map((tab, i) => (
				<Box key={i}>
					<Stack
						onClick={() => {
							handleClick(i);
						}}
						sx={{
							gap: '0.25rem',
							alignItems: 'center',
							cursor: 'pointer',
							position: 'relative',
						}}>
						<Box
							component="span"
							sx={{
								height: '16px',
								width: '16px',
								stroke:
									activeTab === i
										? 'var(--gary-darker) !important'
										: 'var(--gray-color) !important',
							}}>
							{reduxIcons[tab.icon]}
						</Box>
						<Typography
							variant="body1"
							sx={{
								fontSize: '9.25px',
								color:
									activeTab === i ? 'var(--gary-darker)' : 'var(--gray-color)',
							}}>
							{tab.name}
						</Typography>
						{tab.subTabs && (
							<Stack
								sx={{
									gap: '0.5rem',
									padding: '1rem 2rem',
									borderRadius: '0.75rem',
									position: 'absolute',
									width: '10rem',
									bottom: '140%',
									left: tabs[0].id === 4 ? '-330%' : '50%',
									transform: 'translateX(-30%)',
									backgroundColor: 'white',
									display: showSubTabs ? 'flex' : 'none',
								}}>
								{tab.subTabs.map(
									(subTab, i) =>
										subTab && (
											<Stack
												key={subTab.id}
												direction="row"
												onClick={() => {
													handleClick(i);
												}}
												sx={{
													gap: '0.5rem',
													alignItems: 'center',
													cursor: 'pointer',
												}}>
												<Box
													component="span"
													sx={{
														height: '16px',
														width: '16px',
														stroke:
															activeTab === i
																? 'var(--gary-darker) !important'
																: 'var(--gray-color) !important',
													}}>
													{reduxIcons[subTab.icon]}
												</Box>
												<Typography
													variant="body1"
													sx={{
														fontSize: '9.25px',
														color:
															activeTab === i
																? 'var(--gary-darker)'
																: 'var(--gray-color)',
													}}>
													{subTab.name}
												</Typography>
											</Stack>
										)
								)}
							</Stack>
						)}
					</Stack>
				</Box>
			))}
		</Stack>
	);
};

export default NavLinksPreview;
