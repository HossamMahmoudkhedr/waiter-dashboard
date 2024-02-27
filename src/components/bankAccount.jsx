import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { banks } from '../data/banksData';
import styled from 'styled-components';
import { icons } from '../utils/icons';
import CustomInput from '../utils/customInput';
import Heading from '../utils/heading';
import { useDispatch } from 'react-redux';
import { dataActions } from '../store/data-slice';

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
	const dispatch = useDispatch();
	const [ibanError, setIbanError] = useState('');

	const makeInputNumbers = (e) => {
		if (!/[0-9]/g.test(e.key) && e.key !== 'Backspace') e.preventDefault();
	};

	const handleIbanError = (e) => {
		if (e.target.value !== '' && e.target.value.length < 22) {
			setIbanError('يجب ان يكون رقم الحساب البنكي 22 رقم');
		} else {
			setIbanError('');
		}
	};

	const handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		if (name === 'bankAccountNum') {
			value = `SA${value}`;
		}
		dispatch(dataActions.addData({ key: name, value: value }));
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
				padding: { xs: '0 1rem', lg: '0 5rem' },
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
						disabled={true}
						restprops={{ onChange: handleChange }}
					/>
					<CustomInput
						name="identityNumber"
						type="text"
						text={'رقم الهوية'}
						disabled={true}
						restprops={{ onKeyDown: makeInputNumbers, onChange: handleChange }}
					/>
					<CustomInput
						name="identityExpireDate"
						type="date"
						required={true}
						text={'تاريخ انتهاء الهوية'}
						restprops={{ onChange: handleChange }}
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
						<Box sx={{ position: 'relative', width: 'fit-content' }}>
							<Box
								component="span"
								sx={{ position: 'absolute', left: '-15px', top: '0px' }}>
								*
							</Box>
							<Typography
								variant="body1"
								sx={{ fontWeight: '700', color: 'var(--gray-color)' }}>
								اسم البنك
							</Typography>
						</Box>
						<Box
							sx={{
								position: 'relative',
								backgroundColor: 'var(--white)',
								borderRadius: '1rem',
								boxShadow: 'var(--gray-shadow)',
							}}>
							<StyledSelect
								name="bankName"
								id="bankName"
								onChange={handleChange}
								required
								value={'bank_name'}
								ref={selectRef}>
								<option
									value="bank_name"
									disabled>
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
						hasCountryCode={true}
						required={true}
						error={ibanError}
						restprops={{
							onKeyDown: makeInputNumbers,
							maxLength: 22,
							onBlur: handleIbanError,
							onChange: handleChange,
						}}
					/>

					<CustomInput
						name="accountName"
						type="text"
						text={'اسم الحساب'}
						required={true}
						restprops={{ onChange: handleChange }}
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
						disabled={true}
						required={true}
						restprops={{ onKeyDown: makeInputNumbers, onChange: handleChange }}
					/>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default BankAccount;
