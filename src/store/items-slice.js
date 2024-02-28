import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
	name: 'items',
	initialState: {
		bannerItemsLength: 0,
		items: [
			{
				id: 5,
				name: 'منتجات ثابتة',
				icon: 'items',
				def: 'staticProducts',
			},
		],
		availableItems: [
			{
				id: 0,
				name: 'بنر عريض',
				icon: 'adjacent',
				def: 'banner',
				bannerImages: [],
			},
			{
				id: 6,
				name: 'صور مربعة',
				icon: 'image',
				def: 'squareImages',
			},
		],
	},
	reducers: {
		addItem(state, action) {
			if (state.availableItems[action.payload].def === 'banner') {
				if (state.bannerItemsLength < 5) {
					state.availableItems[action.payload].id = state.bannerItemsLength;
					state.items.push(state.availableItems[action.payload]);
					state.bannerItemsLength += 1;
				}
				if (state.bannerItemsLength === 5) {
					state.availableItems.splice(action.payload, 1);
				}
			} else {
				state.items.push(state.availableItems[action.payload]);
				state.availableItems.splice(action.payload, 1);
			}
		},
		removeItem(state, action) {
			if (state.items[action.payload].def === 'banner') {
				if (state.bannerItemsLength === 5) {
					state.availableItems.push(state.items[action.payload]);
				}
				state.items.splice(action.payload, 1);
				state.bannerItemsLength -= 1;
			} else {
				state.availableItems.push(state.items[action.payload]);
				state.items.splice(action.payload, 1);
			}
			state.availableItems.sort((a, b) => {
				return a.id - b.id;
			});
		},
		reOrderItems(state, action) {
			state.items = action.payload;
		},
		addImage(state, action) {
			state.items[action.payload.bannerIndex].bannerImages.push(
				action.payload.src
			);
		},
		removeImage(state, action) {
			state.items[action.payload.bannerIndex].bannerImages.splice(
				action.payload.imageIndex,
				1
			);
		},
		changeImage(state, action) {
			state.items[action.payload.bannerIndex].bannerImages[
				action.payload.imageIndex
			] = action.payload.src;
		},
		resetBanner(state, action) {
			state.items[action.payload].bannerImages = [];
		},
	},
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice;
