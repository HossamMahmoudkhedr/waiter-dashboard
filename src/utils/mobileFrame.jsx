import { Box, Stack } from '@mui/material';
import React from 'react';

const MobileFrame = ({ children }) => {
	return (
		<Box
			sx={{
				border: '6px solid black',
				height: '733px',
				width: { xs: '356px', lg: '365px' },
				borderRadius: '61px',
				position: 'relative',
			}}>
			{/* Start Buttons */}
			<Box
				sx={{
					width: '3.5px',
					height: '78px',
					backgroundColor: 'black',
					position: 'absolute',
					right: '-8px',
					top: '200px',
					borderRadius: '0px 2px 2px 0px',
				}}></Box>
			<Box
				sx={{
					width: '3.5px',
					height: '51px',
					backgroundColor: 'black',
					position: 'absolute',
					left: '-8px',
					top: '246px',
					borderRadius: '2px 0px 0px 2px',
				}}></Box>
			<Box
				sx={{
					width: '3.5px',
					height: '51px',
					backgroundColor: 'black',
					position: 'absolute',
					left: '-8px',
					top: '183px',
					borderRadius: '2px 0px 0px 2px',
				}}></Box>
			<Box
				sx={{
					width: '3.5px',
					height: '24.5px',
					backgroundColor: 'black',
					position: 'absolute',
					left: '-8px',
					top: '134px',
					borderRadius: '2px 0px 0px 2px',
				}}></Box>
			{/* End Buttons */}
			{/* Start Inner Frame */}
			<Box
				sx={{
					width: '100%',
					height: '100%',
					border: '10px solid black',
					borderRadius: '54px',
					boxShadow: ' 0 0 8px 0px #ffffff6e ',
					overflow: 'hidden',
					position: 'relative',
				}}>
				{/* Start Notche */}
				<Stack
					direction="row"
					sx={{
						width: '95px',
						height: '26px',
						backgroundColor: 'black',
						borderRadius: '15px',
						position: 'absolute',
						left: '50%',
						transform: 'translateX(-50%)',
						top: '10px',
						alignItems: 'center',
						justifyContent: 'flex-start',
						padding: '4px 7px',
						gap: '8px',
						zIndex: 3,
					}}>
					{/* Start Lens Container */}
					<Box sx={{ position: 'relative', width: '16px' }}>
						<Box
							sx={{
								backgroundColor: '#0E0B0F',
								width: '16px',
								height: '16px',
								borderRadius: '50%',
								position: 'absolute',
								left: '50%',
								top: '50%',
								transform: 'translate(-50%, -50%)',
							}}></Box>
						<Box
							sx={{
								backgroundColor: '#161424',
								width: '8px',
								height: '8px',
								borderRadius: '50%',
								position: 'absolute',
								left: '50%',
								top: '50%',
								transform: 'translate(-50%, -50%)',
							}}></Box>
						<Box
							sx={{
								backgroundColor: '#0F0F2A',
								width: '5px',
								height: '5px',
								borderRadius: '50%',
								position: 'absolute',
								left: '50%',
								top: '50%',
								transform: 'translate(-50%, -50%)',
							}}></Box>
						<Box
							sx={{
								backgroundColor: '#393752',
								width: '2px',
								height: '2px',
								borderRadius: '50%',
								position: 'absolute',
								left: '50%',
								top: '50%',
								transform: 'translate(-50%, -50%)',
							}}></Box>
					</Box>
					{/* End Lens Container */}
					{/* Start Green Lens */}
					<Box
						sx={{
							width: '3.5px',
							height: '3.5px',
							borderRadius: '50%',
							backgroundColor: '#30B94D',
						}}></Box>
					{/* End Green Lens */}
				</Stack>
				{/* End Notche */}
				{children}
			</Box>
			{/* End Inner Frame */}
		</Box>
	);
};

export default MobileFrame;
