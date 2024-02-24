import { Grid, ImageList, Stack } from '@mui/material';
import React, { useRef, useState } from 'react';
import Heading from '../utils/heading';
import { icons } from '../utils/icons';
import CustomDesignButton from '../utils/customDesignButton';
import { useDispatch, useSelector } from 'react-redux';
import {
	handleRemoveImage,
	handleUploadChange,
} from '../store/settingsActions';
import { squareActions } from '../store/square-slice';

const SquareImagesSettings = () => {
	const inputFileRef = useRef();
	const changeFileRef = useRef();
	const [change, setChange] = useState(null);
	const dispatch = useDispatch();
	const imagesList = useSelector((state) => state.square.imagesList);

	const handleUploadClick = () => {
		inputFileRef.current.click();
	};

	const handleChangeImage = (i) => {
		setChange(i);
		changeFileRef.current.click();
		inputFileRef.current.value = '';
	};
	return (
		<Stack sx={{ gap: '1rem' }}>
			<Heading
				text="صورة مربعة"
				subText="إختر الصورة"
			/>
			<input
				ref={inputFileRef}
				onChange={(e) => {
					handleUploadChange(e, false, null, squareActions, dispatch);
				}}
				type="file"
				accept="image/*"
				style={{ display: 'none' }}
			/>
			<input
				ref={changeFileRef}
				onChange={(e) => {
					handleUploadChange(e, true, change, squareActions, dispatch);
				}}
				type="file"
				accept="image/*"
				style={{ display: 'none' }}
			/>
			<Grid
				container
				spacing={2}>
				{imagesList.map((image, i) => (
					<Grid
						key={i}
						item
						xs={12}
						md={6}>
						{image !== undefined && (
							<Stack sx={{ alignItems: 'center', gap: '1rem' }}>
								<img
									src={image}
									alt=""
									style={{
										objectFit: 'cover',
										width: '100%',
										height: '183px',
										borderRadius: '0.75rem',
									}}
								/>
								<Stack sx={{ gap: '0.5rem', width: '100%' }}>
									<CustomDesignButton
										bg={'var(--danger-dark)'}
										icon={icons.close}
										textcolor={'white'}
										iconstroke={'white'}
										text={'حذف الصورة'}
										width={'100%'}
										iconheight={'24px'}
										restporps={{
											onClick: () => {
												handleRemoveImage(
													i,
													squareActions,
													inputFileRef,
													dispatch
												);
											},
										}}
									/>

									<CustomDesignButton
										bg={'var(--white)'}
										icon={icons.upload}
										text={'تغيير الصورة'}
										width={'100%'}
										restporps={{
											onClick: () => {
												handleChangeImage(i);
											},
										}}
									/>
								</Stack>
							</Stack>
						)}
					</Grid>
				))}
			</Grid>
			{imagesList.includes(undefined) && (
				<CustomDesignButton
					bg="var(--gray-lighter)"
					icon={icons.upload}
					textcolor="var(--gray-darker)"
					text="أضف الصورة"
					restporps={{
						onClick: handleUploadClick,
					}}
				/>
			)}
		</Stack>
	);
};

export default SquareImagesSettings;
