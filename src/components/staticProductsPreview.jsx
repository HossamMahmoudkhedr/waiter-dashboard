import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { icons } from '../utils/icons';
import { staticProducts } from '../data/staticProductsData';

const StaticProductsPreview = () => {
	return (
		<Stack sx={{ gap: '0.4rem' }}>
			{staticProducts.map((product) => (
				<Stack
					key={product.id}
					direction="row"
					sx={{
						padding: '0.4rem',
						gap: '1rem',
						backgroundColor: 'white',
						borderRadius: '9.25px',
					}}>
					<Box>
						<img
							src={require(`../assets/images/${product.image}`)}
							alt=""
							style={{ objectFit: 'cover', height: '100%' }}
						/>
					</Box>
					<Stack sx={{ justifyContent: 'space-between', width: '100%' }}>
						<Stack
							direction="row"
							sx={{ justifyContent: 'space-between' }}>
							<Stack sx={{ gap: '0.2rem' }}>
								<Typography
									variant="body1"
									sx={{ fontWeight: '700', fontSize: '0.75rem' }}>
									{product.name}
								</Typography>
								<Stack
									direction="row"
									sx={{ alignItems: 'center', gap: '0.2rem' }}>
									<Box component="span">{icons.star}</Box>
									<Typography
										variant="body1"
										sx={{ color: 'var(--gray-color)', fontSize: '0.6rem' }}>
										{product.rate}
										{` `}
										{`(${product.numberOfPeople})`}
									</Typography>
								</Stack>
							</Stack>
							<Stack
								sx={{
									justifyContent: 'center',

									backgroundColor: 'var(--body-background-color)',

									padding: '6px 12px',
									borderRadius: '9px',
									height: '30px',
								}}>
								<Typography
									variant="body1"
									sx={{
										fontSize: '9.25px',
										color: 'var(--gray-darker)',
										fontWeight: '400',
									}}>
									{product.type}
								</Typography>
							</Stack>
						</Stack>
						<Stack
							direction="row"
							sx={{ justifyContent: 'space-between' }}>
							<Box>
								<Typography
									variant="body1"
									sx={{
										fontWeight: '500',
										fontSize: '10px',
										color: 'var(--gray-darker)',
									}}>
									{product.price} ر.س
								</Typography>
							</Box>
							{product.quantity > 0 && (
								<Stack
									direction="row"
									sx={{ alignItems: 'center', gap: '5px' }}>
									<Box component="span">{icons.darkPlus}</Box>
									<Box>
										<Typography
											variant="body1"
											sx={{
												fontWeight: '500',
												fontSize: '9.25px',
												color: 'var(--gray-darker)',
												marginBottom: '4px',
											}}>
											{product.quantity < 10 && `0${product.quantity}`}{' '}
											{product.quantity >= 10 && product.quantity}
										</Typography>
									</Box>
									<Box component="span">{icons.minus}</Box>
								</Stack>
							)}
							{!product.quantity && (
								<Stack
									direction="row"
									sx={{ alignItems: 'center', gap: '5px' }}>
									<Box component="span">{icons.cartIcon}</Box>
									<Typography
										variant="body1"
										sx={{
											fontSize: '9.25px',
											fontWeight: '500',
											color: 'var(--gray-darker)',
										}}>
										أضف طلبك
									</Typography>
								</Stack>
							)}
						</Stack>
					</Stack>
				</Stack>
			))}
		</Stack>
	);
};

export default StaticProductsPreview;
