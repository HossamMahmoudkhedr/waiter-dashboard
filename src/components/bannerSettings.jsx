import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Heading from '../utils/heading';
import CustomDesignButton from '../utils/customDesignButton';
import { icons } from '../utils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { bannerActions } from '../store/banner-slice';
import {
	handleRemoveImage,
	handleUploadChange,
} from '../store/settingsActions';

const BannerSettings = () => {
	const inputFileRef = useRef();
	const changeFileRef = useRef();
	const [change, setChange] = useState(null);
	const dispatch = useDispatch();
	const bannerImages = useSelector((state) => state.banner.bannerImages);

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
				text="بنر عريض"
				subText="إختر صورة البنر"
			/>
			<Stack sx={{ gap: '1rem' }}>
				<input
					onChange={(e) => {
						handleUploadChange(e, false, null, bannerActions, dispatch);
					}}
					ref={inputFileRef}
					type="file"
					accept="image/*"
					style={{ display: 'none' }}
				/>
				<input
					onChange={(e) => {
						handleUploadChange(e, true, change, bannerActions, dispatch);
					}}
					ref={changeFileRef}
					type="file"
					accept="image/*"
					style={{ display: 'none' }}
				/>
				{bannerImages &&
					bannerImages.map((image, i) => (
						<Stack
							key={i}
							direction="row"
							sx={{
								position: 'relative',
							}}>
							<img
								style={{ width: '100%', borderRadius: '1.25rem' }}
								src={image}
								alt=""
							/>
							<Stack
								direction="row"
								sx={{
									position: 'absolute',
									left: '50%',
									bottom: '20px',
									transform: 'translateX(-50%)',
									gap: '1rem',
									width: '90%',
								}}>
								<CustomDesignButton
									bg={'var(--white)'}
									icon={icons.upload}
									text="تغيير الصورة"
									width="50%"
									restporps={{
										onClick: () => {
											handleChangeImage(i);
										},
									}}
								/>

								<CustomDesignButton
									bg={'var(--danger-dark)'}
									textcolor="white"
									iconstroke="white"
									iconheight={'24px'}
									icon={icons.close}
									text="حذف الصورة"
									width="50%"
									restporps={{
										onClick: () => {
											handleRemoveImage(
												i,
												bannerActions,
												inputFileRef,
												dispatch
											);
										},
									}}
								/>
							</Stack>
						</Stack>
					))}
				{bannerImages.length < 3 && (
					<CustomDesignButton
						bg="var(--gray-lighter)"
						icon={icons.upload}
						textcolor="var(--gray-darker)"
						text="أضف صورة البنر"
						restporps={{ onClick: handleUploadClick }}
					/>
				)}
			</Stack>
		</Stack>
	);
};

export default BannerSettings;
