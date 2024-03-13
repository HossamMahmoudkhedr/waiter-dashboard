import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { banks } from '../data/banksData';
import styled from 'styled-components';
import { icons } from '../utils/icons';
import CustomInput from '../utils/customInput';
import Heading from '../utils/heading';
import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../store/data-slice';
import DatePicker from '@sanitysign/react-multi-date-picker';
import arabic from 'react-date-object/calendars/arabic';
import arabic_ar from 'react-date-object/locales/arabic_ar';
import ErrorMessage from '../utils/errorMessage';

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

const BankAccount = ({ setDisabled, clicked }) => {
	const data = useSelector((state) => state.data.data);
	const selectRef = useRef(null);
	const dispatch = useDispatch();
	const [ibanError, setIbanError] = useState('');
	const [bankNameError, setBankNameError] = useState('');
	const [identityError, setIdentityError] = useState('');
	const [accountNameError, setAccountNameError] = useState('');
	const [bankName, setBankName] = useState(
		data.bankName ? data.bankName : 'bank_name'
	);
	const [isHijri, setIshijri] = useState(true);
	const [dateType, setDateType] = useState({});

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

	useEffect(() => {
		console.log(clicked);
		if (clicked) {
			if (
				data.bankName === 'bankName' ||
				!data.bankName ||
				data.bankName === ''
			) {
				setBankNameError('قم باختيار اسم البنك');
			} else {
				setBankNameError('');
			}
			if (!data.date || data.date === '') {
				setIdentityError('قم بادخال تاريخ انتهاء الهوية');
			} else {
				setIdentityError('');
			}
			if (!data.bankAccountNum || data.bankAccountNum === 'SA') {
				setIbanError('قم بادخال رقم الحساب البنكي بدون SA');
			} else {
				setIbanError('');
			}
			if (!data.accountName || data.accountName === '') {
				setAccountNameError('قم بادخال اسم الحساب');
			} else {
				setAccountNameError('');
			}
		}
	}, [
		clicked,
		data.bankName,
		data.date,
		data.bankAccountNum,
		data.accountName,
	]);
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

	const handleDateChange = () => {
		setIshijri(!isHijri);
		dispatch(dataActions.addData({ key: 'date', value: '' }));
		if (isHijri) {
			setDateType({ calendar: arabic, locale: arabic_ar });
		} else {
			setDateType({});
		}
	};

	const handleDateValue = (date, { input, isTyping }) => {
		dispatch(dataActions.addData({ key: 'date', value: '' }));
		if (!isTyping) {
			if (date) {
				dispatch(
					dataActions.addData({
						key: 'date',
						value: `${date.year}/${date.month.number}/${date.day}`,
					})
				);
			}
		} else {
			const strings = input.value.split('/');
			const numbers = strings.map(Number);
			const [month, day] = numbers;

			if (input.value && numbers.some((number) => isNaN(number))) {
				return false; //in case user enter something other than digits
			}

			if (month > 12 || month < 0) return false; //month < 0 in case user want to type 01
			if (day < 0 || (date && day > date.day)) return false;
			if (strings.some((val) => val.startsWith('00'))) return false;

			if (date) {
				dispatch(
					dataActions.addData({
						key: 'date',
						value: `${date.year}/${date.month.number}/${date.day}`,
					})
				);
			}
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
								border: identityError ? '1px solid #ff3333' : 'unset',
								boxShadow: 'var(--gray-shadow)',
								overflow: 'hidden',
								padding: '1rem 0.75rem',
								width: '100%',
								justifyContent: 'space-between',
							}}>
							<StyledInput
								style={{ width: '50%' }}
								type="text"
								onChange={handleChange}
								value={data.identityNumber && data.identityNumber}
								disabled
								placeholder="رقم الهوية"
							/>

							<DatePicker
								placeholder="YY/MM"
								onChange={handleDateValue}
								name="date"
								value={data.date}
								style={{
									width: '120px',
									border: 'none',
									outline: 'none',
								}}
								{...dateType}>
								<Button
									onClick={handleDateChange}
									variant="text"
									sx={{ color: 'var(--primary-color)' }}>
									{isHijri ? 'هجري' : 'ميلادي'}
								</Button>
							</DatePicker>
						</Stack>
						{identityError && <ErrorMessage message={identityError} />}
					</Stack>
					<Stack
						sx={{
							gap: '1rem',
						}}>
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
								border: bankNameError ? '1px solid #ff3333' : 'unset',
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
						{bankNameError && <ErrorMessage message={bankNameError} />}
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
						error={accountNameError}
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
