import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled(Button)`
	&& {
		background-color: ${(props) => props.bg};
		color: ${(props) => props.textcolor};
		padding: 0.875rem 1.25rem;
		width: 170px;
		font-weight: 500;
		border-radius: 1rem;

		&&:hover {
			background-color: ${(props) => props.bg};
			color: ${(props) => props.textcolor};
		}
	}
	@media (max-width: 899px) {
		&& {
			width: 100%;
		}
	}
`;

const CustomButton = ({ text, textcolor, bg, width, type, restprops }) => {
	return (
		<StyledButton
			disableElevation
			variant="contained"
			textcolor={textcolor}
			type={type || 'button'}
			bg={bg}
			{...restprops}>
			{text}
		</StyledButton>
	);
};

export default CustomButton;
