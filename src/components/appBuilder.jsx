import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { icons } from '../utils/icons';
import { stepperData } from '../data/appBuilderStepper';
import CustomButton from '../utils/customButton';
import CreateApp from './createApp';
import DesignApp from './designApp';
import Review from './review';
import BankAccount from './bankAccount';
import { useSelector } from 'react-redux';

const stepperContent = [
	<CreateApp />,
	<DesignApp />,
	<BankAccount />,
	<Review />,
];
const AppBuilder = () => {
	const [chosenStep, setChosenStep] = useState(0);

	const data = useSelector((state) => state.data.data);

	const handleback = () => {
		chosenStep > 0 ? setChosenStep((prev) => (prev -= 1)) : setChosenStep(0);
	};
	const handleforward = () => {
		chosenStep < stepperData.length - 1
			? setChosenStep((prev) => (prev += 1))
			: setChosenStep(stepperData.length - 1);
	};
	useEffect(() => {
		console.log(data);
	}, [chosenStep, data]);

	return (
		<Box>
			<Stack sx={{ gap: '2rem' }}>
				<Stack
					direction="row"
					sx={{ gap: '1rem', padding: { xs: '0rem 1rem', lg: 'unset' } }}>
					<Typography
						variant="body1"
						sx={{ color: 'var(--icons-color)', fontWeight: '600' }}>
						الرئيسية
					</Typography>
					<span style={{ marginTop: '2px' }}>{icons.arrowLeft}</span>
					<Typography
						variant="body1"
						sx={{ color: 'var(--primary-color)', fontWeight: '600' }}>
						صانع التطبيقات
					</Typography>
				</Stack>
				<Stack
					direction="row"
					sx={{
						alignItems: 'center',
						gap: '0.5rem',
						color: 'var(--gray-color)',
						padding: '0rem 1rem',
					}}>
					<span>{icons.mobileLarger}</span>
					<Typography
						variant="h1"
						sx={{
							fontSize: '2rem',
							fontWeight: '600',
							color: 'var(--gray-color)',
						}}>
						صانع التطبيقات
					</Typography>
				</Stack>
				<Stack
					direction="row"
					className="stepper"
					sx={{
						overflowX: { xs: 'scroll', lg: 'unset' },
						padding: { xs: '0.5rem 0', lg: 'unset' },
						marginRight: { xs: '1rem', lg: 'unset' },
					}}>
					{stepperData.map((el, i) => (
						<Stack
							key={el.id}
							direction="row"
							sx={{
								minWidth: { xs: 'fit-content', lg: 'unset' },
								gap: '0.5rem',
								padding: '0.75rem 1.25rem',
								fontWeight: '500',
								alignItems: 'center',
								fontSize: '0.875rem',
								borderRadius: '3rem',
								filter: chosenStep < i ? 'grayscale(1)' : 'unset',
								opacity: chosenStep < i ? '0.35' : 'unset',
								color:
									chosenStep === i ? 'var(--white)' : 'var(--primary-light)',
								backgroundColor:
									chosenStep === i ? 'var(--primary-color)' : 'transparent',
							}}>
							<Stack
								component="span"
								sx={{
									color: 'var(--white)',
									width: '28px',
									height: '28px',
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: '50%',
									fontSize: '0.75rem',
									backgroundColor:
										chosenStep === i
											? 'var(--primary-dark-color)'
											: 'var(--primary-light)',
								}}>
								{el.number}
							</Stack>
							<Typography
								variant="body1"
								sx={{ fontWeight: 'inherit' }}>
								{el.name}
							</Typography>
							{chosenStep > i && icons.check}
						</Stack>
					))}
				</Stack>
				<Box>{stepperContent[chosenStep]}</Box>
				<Stack
					direction={{ xs: 'column-reverse', md: 'row' }}
					sx={{
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: { xs: '0 1rem', lg: 'unset' },
						gap: { xs: '1rem', md: 'unset' },
					}}>
					<CustomButton
						text="السابق"
						textcolor="var(--black)"
						bg="var(--gray-lighter)"
						width="100%"
						restprops={{
							onClick: handleback,
						}}
					/>
					<CustomButton
						text="التالي"
						textcolor="var(--white)"
						bg="var(--primary-color)"
						width="100%"
						restprops={{
							onClick: handleforward,
						}}
					/>
				</Stack>
			</Stack>
		</Box>
	);
};

export default AppBuilder;
