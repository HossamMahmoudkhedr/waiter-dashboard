import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Heading from '../utils/heading';
import CustomDesignButton from '../utils/customDesignButton';
import { icons } from '../utils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { bannerActions } from '../store/banner-slice';
import { itemsActions } from '../store/items-slice';
import { dataActions } from '../store/data-slice';
import { handleRemoveImage } from '../store/settingsActions';

const BannerSettings = ({ currentBanner, chosenItemIndex }) => {
	const inputFileRef = useRef();
	const changeFileRef = useRef();
	const [change, setChange] = useState(null);
	const dispatch = useDispatch();
	// const bannerImages = useSelector((state) => state.banner.bannerImages);
	const bannerImages = currentBanner.bannerImages;
	const handleUploadClick = () => {
		inputFileRef.current.click();
	};

	const handleChangeImage = (i) => {
		setChange(i);
		changeFileRef.current.click();
		inputFileRef.current.value = '';
	};

	const handleUploadChange = (
		e,
		change = false,
		index = null,
		targetActions,
		dispatch
	) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (!change) {
					dispatch(
						targetActions.addImage({
							bannerIndex: chosenItemIndex,
							src: e.target.result,
						})
					);
				} else {
					let newSrc = e.target.result;
					dispatch(
						targetActions.changeImage({
							bannerIndex: chosenItemIndex,
							imageIndex: index,
							src: newSrc,
						})
					);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = (index, targetActions, ref, dispatch) => {
		dispatch(
			targetActions.removeImage({
				bannerIndex: chosenItemIndex,
				imageIndex: index,
			})
		);
		ref.current.value = '';
	};
	// useEffect(() => {
	// 	dispatch(dataActions.addData({ key: 'bannerImages', value: bannerImages }));
	// }, [bannerImages.length]);
	return (
		<Stack sx={{ gap: '1rem' }}>
			<Heading
				text="بنر عريض"
				subText="إختر صورة البنر"
			/>
			<Stack sx={{ gap: '1rem' }}>
				<input
					onChange={(e) => {
						handleUploadChange(e, false, null, itemsActions, dispatch);
					}}
					ref={inputFileRef}
					type="file"
					accept="image/*"
					style={{ display: 'none' }}
				/>
				<input
					onChange={(e) => {
						handleUploadChange(e, true, change, itemsActions, dispatch);
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
												itemsActions,
												inputFileRef,
												dispatch
											);
										},
									}}
								/>
							</Stack>
						</Stack>
					))}
				{bannerImages && bannerImages.length < 3 && (
					<CustomDesignButton
						bg="var(--gray-lighter)"
						icon={icons.upload}
						textcolor="var(--gray-darker)"
						text="أضف صورة البنر"
						restporps={{ onClick: handleUploadClick }}
					/>
				)}
				<Stack
					direction="row"
					sx={{ justifyContent: 'center' }}>
					<Typography
						variant="caption"
						sx={{
							color: 'var(--gray-darker)',
							fontSize: '0.9rem',
						}}>
						* قم بإضافة صورة تملأ المساحة المحددة *
					</Typography>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default BannerSettings;
