import { createSlice } from '@reduxjs/toolkit';
import { icons } from '../utils/icons';

const screensSlice = createSlice({
	name: 'screens',
	initialState: {
		screens: [],
		availableScreens: [
			{
				id: 1,
				name: 'شاشة البداية',
				icon: 'twoPhones',
				def: 'screens',
			},
		],
	},
	reducers: {
		addItem(state, action) {
			state.screens.push(state.availableScreens[action.payload]);
			state.availableScreens.splice(action.payload, 1);
		},
		removeItem(state, action) {
			state.availableScreens.push(state.screens[action.payload]);
			state.screens.splice(action.payload, 1);
			state.availableScreens.sort((a, b) => {
				return a.id - b.id;
			});
		},
	},
});

export const screensActions = screensSlice.actions;
export default screensSlice;
