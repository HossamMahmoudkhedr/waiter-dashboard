import { configureStore } from '@reduxjs/toolkit';
import itemsSlice from './items-slice';
import bannerSlice from './banner-slice';
import squareSlice from './square-slice';

const store = configureStore({
	reducer: {
		items: itemsSlice.reducer,
		banner: bannerSlice.reducer,
		square: squareSlice.reducer,
	},
});

export default store;
