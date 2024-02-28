import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { designData } from '../data/designStepData';
import MainPage from './mainPage';
import StartingScreens from './startingScreens';
import Tabs from './tabs';
import GeneralSettings from './generalSettings';
import { useSelector } from 'react-redux';

const content = [
	<MainPage />,
	<StartingScreens />,
	<Tabs />,
	<GeneralSettings />,
];

const DesignApp = ({ setDisabled }) => {
	const [chosenContent, setChosenContent] = useState(0);
	const chosenItems = useSelector((state) => state.items.items);

	useEffect(() => {
		if (chosenItems.length > 0) {
			setDisabled(false);
		}
	}, [chosenItems.length, setDisabled]);

	const handleClick = (index) => {
		setChosenContent(index);
	};
	return (
		<Stack sx={{ gap: '2rem' }}>
			<Stack
				direction="row"
				className="stepper"
				sx={{
					gap: '0.875rem',
					overflowX: { xs: 'scroll', lg: 'unset' },
					padding: { xs: '0.5rem 0', lg: 'none' },
					marginRight: { xs: '1rem', lg: 'unset' },
				}}>
				{designData.map((el, i) => {
					return (
						<Stack
							direction="row"
							onClick={() => {
								handleClick(i);
							}}
							sx={{
								gap: '0.4rem',
								backgroundColor:
									chosenContent === i
										? 'var(--primary-color)'
										: 'var(--gray-lighter)',
								padding: { xs: '0.8rem 1rem', lg: '0.5rem 0.75rem' },
								borderRadius: '0.75rem',
								cursor: 'pointer',
								minWidth: { xs: 'fit-content', lg: 'unset' },
							}}
							key={el.id}>
							<Box
								component="span"
								sx={{
									fill:
										chosenContent === i ? 'var(--white)' : 'var(--gray-darker)',
									height: '1.5rem',
								}}>
								{el.icon}
							</Box>
							<Typography
								variant="body1"
								sx={{
									fontWeight: '500',
									color:
										chosenContent === i ? 'var(--white)' : 'var(--gray-darker)',
								}}>
								{el.name}
							</Typography>
						</Stack>
					);
				})}
			</Stack>
			<Box sx={{ padding: { xs: '0rem 1rem', lg: 'unset' } }}>
				{content[chosenContent]}
			</Box>
		</Stack>
	);
};

export default DesignApp;
