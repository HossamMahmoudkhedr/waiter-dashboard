import { Box, Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled(Button)`
	&& {
		width: ${(props) => props.width};
		border: 1px solid ${(props) => props.border};
		background-color: ${(props) => props.bg};
		color: ${(props) => props.textcolor};
		padding: 0.75rem 1rem;
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	&&:hover {
		background-color: ${(props) => props.bg};
	}
`;
const CustomDesignButton = ({
	text,
	width,
	icon,
	border,
	bg,
	textcolor,
	restporps,
	iconstroke,
	iconheight,
}) => {
	return (
		<StyledButton
			disableElevation
			variant="contained"
			width={width || '100%'}
			border={border || bg}
			textcolor={textcolor || 'var(--black)'}
			bg={bg || 'transparent'}
			{...restporps}>
			<Box
				component={'span'}
				sx={{
					height: iconheight || '16px',
					stroke: iconstroke || 'var(--gray-darker)',
				}}>
				{icon}
			</Box>
			{text}
		</StyledButton>
	);
};

export default CustomDesignButton;
