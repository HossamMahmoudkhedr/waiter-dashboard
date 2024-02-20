import { createSlice } from '@reduxjs/toolkit';

const squareSlice = createSlice({
	name: 'square',
	initialState: { imagesList: Array.apply(null, Array(4)) },
	reducers: {
		addImage(state, action) {
			state.imagesList.unshift(action.payload);
			state.imagesList.pop();
			state.imagesList.sort((a, b) => a - b);
		},
		changeImage(state, action) {
			state.imagesList[action.payload.index] = action.payload.src;
		},
		removeImage(state, action) {
			state.imagesList[action.payload] = undefined;
		},
		resetList(state) {
			state.imagesList = Array.apply(null, Array(4));
		},
	},
});

export const squareActions = squareSlice.actions;
export default squareSlice;
