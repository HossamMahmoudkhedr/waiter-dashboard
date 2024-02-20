import { Box, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const styleSkeleton = {
	width: '100%',
	height: '100%',
	variant: 'rounded',
	animation: false,
};

const text = [
	'أشهى وألذ الاطباق بين يديك الآن.',
	'هامبرغر شهية و لذيذة خصيصا لكم.',
	'أشهى و ألذ الأطباق بين يديك الآن.',
	'أطباق لذيذة و شهية بين يديك الآن.',
];
const SquareImagesSkeleton = () => {
	const imagesList = useSelector((state) => state.square.imagesList);
	console.log(imagesList[0] === undefined);
	return (
		<Stack
			direction="row"
			sx={{ flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
			{imagesList.map((image, i) => {
				return (
					<Box
						width="48%"
						height="141px"
						sx={{ position: 'relative' }}>
						{image !== undefined && (
							<>
								<Box
									sx={{
										position: 'absolute',
										background:
											'linear-gradient(95deg, transparent , #000000a8 95%)',
										width: '100%',
										height: '100%',
										zIndex: '1',
										borderRadius: '0.75rem',
									}}>
									<Stack sx={{ padding: '1.1rem', width: '90%', gap: '1rem' }}>
										<Typography
											variant="body1"
											sx={{
												color: 'white',
												fontWeight: 'bold',
												fontSize: '12.5px',
											}}>
											{text[i]}
										</Typography>
									</Stack>
								</Box>
								<img
									width="100%"
									height="100%"
									src={image}
									alt=""
									style={{ objectFit: 'cover', borderRadius: '0.75rem' }}
								/>
							</>
						)}
						{image === undefined && (
							<Skeleton
								{...styleSkeleton}
								sx={{ borderRadius: '0.75rem' }}
							/>
						)}
					</Box>
				);
			})}
		</Stack>
	);
};

export default SquareImagesSkeleton;
