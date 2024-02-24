import { Box, Stack } from '@mui/material';
import React, { useRef, useState } from 'react';
import Heading from '../utils/heading';
import CustomDesignButton from '../utils/customDesignButton';
import { useDispatch, useSelector } from 'react-redux';
import { icons } from '../utils/icons';
import {
	handleRemoveImage,
	handleUploadChange,
} from '../store/settingsActions';
import { screenImagesActions } from '../store/screen-images-slice';

const StartingScreensSettings = () => {
	const inputFileRef = useRef();
	const changeFileRef = useRef();
	const [change, setChange] = useState(null);
	const dispatch = useDispatch();
	const screenImages = useSelector((state) => state.screenImages.screenImages);

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
				text="شاشة البداية"
				subText="إختر الصورة"
			/>
			<input
				ref={inputFileRef}
				onChange={(e) => {
					handleUploadChange(e, false, null, screenImagesActions, dispatch);
				}}
				type="file"
				accept="images/*"
				style={{ display: 'none' }}
			/>
			<Stack>
				{screenImages &&
					screenImages.map((image, i) => (
						<Stack
							key={i}
							sx={{ gap: '1rem', width: '50%' }}>
							<img
								width="100%"
								src={image}
								alt=""
								style={{ borderRadius: '1.25rem' }}
							/>
							<Stack
								sx={{
									gap: '1rem',
								}}>
								<CustomDesignButton
									bg={'var(--white)'}
									icon={icons.upload}
									text="تغيير الصورة"
									width="100%"
									restporps={{
										onClick: () => {
											handleChangeImage(i);
										},
									}}
								/>
								<input
									onChange={(e) => {
										handleUploadChange(
											e,
											true,
											change,
											screenImagesActions,
											dispatch
										);
									}}
									ref={changeFileRef}
									type="file"
									accept="image/*"
									style={{ display: 'none' }}
								/>
								<CustomDesignButton
									bg={'var(--danger-dark)'}
									textcolor="white"
									iconstroke="white"
									iconheight={'24px'}
									icon={icons.close}
									text="حذف الصورة"
									width="100%"
									restporps={{
										onClick: () => {
											handleRemoveImage(
												i,
												screenImagesActions,
												inputFileRef,
												dispatch
											);
										},
									}}
								/>
							</Stack>
						</Stack>
					))}
			</Stack>
			{screenImages.length === 0 && (
				<CustomDesignButton
					bg="var(--gray-lighter)"
					icon={icons.upload}
					textcolor="var(--gray-darker)"
					text="أضف صورة البنر"
					restporps={{ onClick: handleUploadClick }}
				/>
			)}
		</Stack>
	);
};

export default StartingScreensSettings;
