import { createSlice } from '@reduxjs/toolkit';
import { icons } from '../utils/icons';

const itemsSlice = createSlice({
	name: 'items',
	initialState: {
		items: [],
		availableItems: [
			{
				id: 1,
				name: 'بنر عريض',
				icon: 'adjacent',
				def: 'banner',
			},
			{
				id: 2,
				name: 'منتجات ثابتة',
				icon: 'items',
				def: 'staticProducts',
			},
			{
				id: 3,
				name: 'صور مربعة',
				icon: 'image',
				def: 'squareImages',
			},
		],
	},
	reducers: {
		addItem(state, action) {
			state.items.push(state.availableItems[action.payload]);
			state.availableItems.splice(action.payload, 1);
		},
		removeItem(state, action) {
			state.availableItems.push(state.items[action.payload]);
			state.items.splice(action.payload, 1);
			state.availableItems.sort((a, b) => {
				return a.id - b.id;
			});
		},
		reOrderItems(state, action) {
			state.items = action.payload;
		},
	},
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice;
