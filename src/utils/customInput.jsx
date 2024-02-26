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
const CustomInput = ({ text, name, type, error, restprops }) => {
	return (
		<Stack sx={{ gap: '0.5rem' }}>
			<Box>
				<Typography
					variant="body1"
					sx={{ fontWeight: '700', color: 'var(--gray-color)' }}>
					{text}
				</Typography>
			</Box>
			<StyledInput
				error={error ? true : false}
				{...restprops}
				type={type}
				name={name}
				id={name}
				placeholder={text}
			/>

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
