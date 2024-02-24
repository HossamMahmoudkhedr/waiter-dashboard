import { createSlice } from '@reduxjs/toolkit';

const screenImagesSlice = createSlice({
	name: 'screenImages',
	initialState: { screenImages: [] },
	reducers: {
		addImage(state, action) {
			state.screenImages.push(action.payload);
		},
		removeImage(state, action) {
			state.screenImages.splice(action.payload, 1);
		},
		changeImage(state, action) {
			state.screenImages[action.payload.index] = action.payload.src;
		},
		resetScreens(state) {
			state.screenImages = [];
		},
	},
});

export const screenImagesActions = screenImagesSlice.actions;
export default screenImagesSlice;
