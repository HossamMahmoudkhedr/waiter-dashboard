import { createSlice } from '@reduxjs/toolkit';

const bannerSlice = createSlice({
	name: 'banner',
	initialState: { bannerImages: [] },
	reducers: {
		addImage(state, action) {
			state.bannerImages.push(action.payload);
		},
		removeImage(state, action) {
			state.bannerImages.splice(action.payload, 1);
		},
		changeImage(state, action) {
			state.bannerImages[action.payload.index] = action.payload.src;
		},
		resetBanner(state) {
			state.bannerImages = [];
		},
	},
});

export const bannerActions = bannerSlice.actions;
export default bannerSlice;
