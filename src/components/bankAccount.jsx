import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { banks } from '../data/banksData';
import styled from 'styled-components';
import { icons } from '../utils/icons';
import CustomInput from '../utils/customInput';
import Heading from '../utils/heading';
import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../store/data-slice';
import moment from 'moment-hijri';

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

const StyledInput = styled.input`
	outline: none;
	border: none;
	// width: 33.33%;
	font-size: 1rem;
	background-color: transparent;
	&::placeholder {
		color: var(--gray-light);
	}
	&[disabled] {
		background-color: white;
	}
`;

const BankAccount = ({ setDisabled }) => {
	const data = useSelector((state) => state.data.data);
	const selectRef = useRef(null);
	const dispatch = useDispatch();
	const [ibanError, setIbanError] = useState('');
	const [bankName, setBankName] = useState(
		data.bankName ? data.bankName : 'bank_name'
	);
	const [identityNumber, setIdentityNumber] = useState('');
	const [hijri, setHijri] = useState(data.hijri ? data.hijri : '');

	useEffect(() => {
		if (
			data.date &&
			data.bankName &&
			data.bankAccountNum &&
			data.bankAccountNum.length === 24 &&
			data.accountName
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [data, setDisabled]);
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

		if (name === 'bankName') {
			setBankName(value);
		}

		if (name === 'identityNumber') {
			setIdentityNumber(value);
		}

		if (name === 'date') {
			let hijriHistory = moment(value, 'YYYY-M-D').format('iYYYY/iM/iD');
			setHijri(hijriHistory);

			dispatch(
				dataActions.addData({
					key: 'hijri',
					value: hijriHistory,
				})
			);
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
						restprops={{
							onChange: handleChange,
							value: data.ownerName && data.ownerName,
						}}
					/>
					{/* <CustomInput
						name="identityNumber"
						type="text"
						text={'رقم الهوية'}
						disabled={true}
						restprops={{
							onKeyDown: makeInputNumbers,
							onChange: handleChange,
							maxLength: 10,
							value: data.identityNumber && data.identityNumber,
						}}
					/> */}
					{/* <CustomInput
						name="identityExpireDate"
						type="date"
						required={true}
						text={'تاريخ انتهاء الهوية'}
						restprops={{ onChange: handleChange }}
					/> */}
					<Stack sx={{ gap: '0.5rem', width: '100%' }}>
						<Stack
							direction={'row'}
							sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
							<Box sx={{ position: 'relative', width: 'fit-content' }}>
								<Typography
									component="label"
									variant="body1"
									sx={{ fontWeight: '700', color: 'var(--gray-color)' }}>
									رقم الهوية
								</Typography>
							</Box>
							<Box
								sx={{
									position: 'relative',
									width: 'fit-content',
									marginLeft: '20px',
								}}>
								<Box
									component="span"
									sx={{ position: 'absolute', left: '-15px', top: '0px' }}>
									*
								</Box>

								<Typography
									component="label"
									variant="body1"
									sx={{ fontWeight: '700', color: 'var(--gray-color)' }}>
									تاريخ انتهاء الهوية
								</Typography>
							</Box>
						</Stack>
						<Stack
							direction="row"
							sx={{
								borderRadius: '1rem',
								backgroundColor: 'var(--white)',
								boxShadow: 'var(--gray-shadow)',
								overflow: 'hidden',
								padding: '1rem 0.75rem',
								width: '100%',
							}}>
							<StyledInput
								style={{ width: '50%' }}
								type="text"
								onChange={handleChange}
								value={data.identityNumber && data.identityNumber}
								disabled
								placeholder="رقم الهوية"
							/>
							<Stack
								direction="row"
								justifyContent={'center'}>
								<StyledInput
									name="hijri"
									style={{ width: '36%' }}
									disabled
									value={hijri}
									type="text"
								/>
								<StyledInput
									type="date"
									name="date"
									onChange={handleChange}
									value={data.date && data.date}
								/>
							</Stack>
						</Stack>
					</Stack>
					<Stack
						sx={{
							gap: '1rem',
						}}>
						{/* <Box>
							<Heading text={'معلومات النشاط التجاري'} />
						</Box> */}

						<CustomInput
							name="commercialNum"
							type="text"
							text={'رقم السجل التجاري'}
							disabled={true}
							restprops={{
								onKeyDown: makeInputNumbers,
								onChange: handleChange,
								value: data.commercialNum && data.commercialNum,
							}}
						/>
					</Stack>
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
								value={bankName}
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
							value: data.bankAccountNum && data.bankAccountNum.slice(2),
						}}
					/>

					<CustomInput
						name="accountName"
						type="text"
						text={'اسم الحساب'}
						required={true}
						restprops={{
							onChange: handleChange,
							value: data.accountName && data.accountName,
						}}
					/>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default BankAccount;
