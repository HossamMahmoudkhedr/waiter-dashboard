import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
	outline: none;
	border: ${(props) => (props.error ? '1px solid #ff3333' : 'none')};
	border-radius: 1rem;
	background-color: var(--white);
	box-shadow: var(--gray-shadow);
	padding: 1rem 0.75rem;
	font-size: 1rem;
	font-weight: 500;
	width: 100%;
	color: ${(props) => (props.error ? '#ff3333' : ' var(--gray-color)')};
	&::placeholder {
		color: var(--gray-light);
	}
`;
const CustomInput = ({
	text,
	name,
	type,
	error,
	disabled,
	hasCountryCode,
	required,
	restprops,
}) => {
	return (
		<Stack sx={{ gap: '0.5rem' }}>
			<Box sx={{ position: 'relative', width: 'fit-content' }}>
				{required && (
					<Box
						component="span"
						sx={{ position: 'absolute', left: '-15px', top: '0px' }}>
						*
					</Box>
				)}
				<Typography
					component="label"
					variant="body1"
					sx={{ fontWeight: '700', color: 'var(--gray-color)' }}>
					{text}
				</Typography>
			</Box>
			<Box sx={{ position: 'relative' }}>
				{disabled && (
					<Box
						sx={{
							position: 'absolute',
							left: 0,
							top: 0,
							width: '100%',
							height: '100%',
							borderRadius: '1rem',
							zIndex: '1',
							backgroundColor: '#ebebe4',
							opacity: '0.3',
						}}></Box>
				)}
				<StyledInput
					error={error}
					{...restprops}
					type={type}
					name={name}
					id={name}
					disabled={disabled}
					required={required}
					placeholder={type === 'date' ? '' : text}
				/>
				{hasCountryCode && (
					<Box
						sx={{
							position: 'absolute',
							left: 0,
							top: 0,
							height: '100%',
							padding: '1rem',
							backgroundColor: 'white',
							borderRadius: '1rem 0 0 1rem',
							zIndex: 1,
							borderRight: '1px solid var(--gray-lighter)',
						}}>
						<Typography
							variant="body1"
							fontSize="1rem"
							fontWeight="600">
							SA
						</Typography>
					</Box>
				)}
			</Box>

			{error && (
				<Typography
					variant="caption"
					sx={{ color: '#ff3333', fontSize: '0.9rem' }}>
					{error}
				</Typography>
			)}
		</Stack>
	);
};

export default CustomInput;
