import { Box, Grid, Select, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { banks } from '../data/banksData';
import styled from 'styled-components';
import { icons } from '../utils/icons';
import CustomInput from '../utils/customInput';
import Heading from '../utils/heading';

const StyledSelect = styled.select`
	border: none;
	padding: 1rem 0.75rem 1rem 2rem;
	-webkit-appearance: none;
	-moz-appearance: none;
	text-indent: 1px;
	text-overflow: '';
	position: relative;
	z-index: 1;
	outline: none;
	background-color: transparent;
	font-size: 1rem;
	font-weight: 500;
	width: 100%;
	color: var(--gray-color);
	cursor: pointer;
	& option {
		cursor: pointer;
	}
`;

const BankAccount = () => {
	const selectRef = useRef(null);
	const [selectedBank, setSelectedBank] = useState('bank_name');
	const handleBankChange = (e) => {
		setSelectedBank(e.target.value);
	};

	const makeInputNumbers = (e) => {
		if (!/[0-9]/g.test(e.key) && e.key !== 'Backspace') e.preventDefault();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<Grid
			component={'form'}
			container
			onSubmit={handleSubmit}
			spacing={{ md: 6 }}
			rowSpacing={{ xs: 6 }}
			sx={{
				width: { xs: '100%', lg: 'unset' },
				padding: { xs: '0 1rem', lg: 'unset' },
			}}>
			<Grid
				item
				md={6}
				xs={12}>
				<Stack
					sx={{
						gap: '1.12rem',
					}}>
					<Box>
						<Heading text={'معلومات المالك'} />
					</Box>
					<CustomInput
						name="ownerName"
						type="text"
						text={'الاسم'}
					/>
					<CustomInput
						name="identityNumber"
						type="text"
						text={'رقم الهوية'}
						restprops={{ onKeyDown: makeInputNumbers }}
					/>
					<CustomInput
						name="identityExpireDate"
						type="date"
						text={'تاريخ انتهاء الهوية'}
					/>
				</Stack>
			</Grid>
			<Grid
				item
				md={6}
				xs={12}>
				<Stack sx={{ gap: '1rem' }}>
					<Box>
						<Heading text={'معلومات الحساب البنكي'} />
					</Box>

					<Stack sx={{ gap: '0.8rem' }}>
						<Typography
							variant="body1"
							sx={{ fontWeight: '700', color: 'var(--gray-color)' }}>
							اسم البنك
						</Typography>
						<Box
							sx={{
								position: 'relative',
								backgroundColor: 'var(--white)',
								borderRadius: '1rem',
								boxShadow: 'var(--gray-shadow)',
							}}>
							<StyledSelect
								ref={selectRef}
								onChange={(e) => {
									handleBankChange(e);
								}}>
								<option
									value="bank_name"
									disabled
									selected>
									اسم البنك
								</option>
								{banks.map((bank) => (
									<option
										key={bank.id}
										value={bank.value}>
										{bank.name}
									</option>
								))}
							</StyledSelect>
							<Box
								component={'span'}
								sx={{
									stroke: 'var(--gray-color)',
									width: '20px',
									height: '20px',
									position: 'absolute',
									left: '0.75rem',
									top: '1.1rem',
									zIndex: 0,
								}}>
								{icons.arrowDown}
							</Box>
						</Box>
					</Stack>

					<CustomInput
						name="bankAccountNum"
						type="text"
						text={'رقم الحساب البنكي'}
						restprops={{ onKeyDown: makeInputNumbers }}
					/>
					<CustomInput
						name="accountName"
						type="text"
						text={'اسم الحساب'}
					/>
				</Stack>
			</Grid>
			<Grid
				item
				md={6}
				xs={12}>
				<Stack
					sx={{
						gap: '1rem',
					}}>
					<Box>
						<Heading text={'معلومات النشاط التجاري'} />
					</Box>

					<CustomInput
						name="commercialNum"
						type="text"
						text={'رقم السجل التجاري'}
						restprops={{ onKeyDown: makeInputNumbers }}
					/>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default BankAccount;
