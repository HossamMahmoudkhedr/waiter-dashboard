import { configureStore } from '@reduxjs/toolkit';
import itemsSlice from './items-slice';
import bannerSlice from './banner-slice';
import squareSlice from './square-slice';
import screensSlice from './screens-slice';
import screenImagesSlice from './screen-images-slice';
import tabsSlice from './tabs-slice';
import generalSettingsSlice from './general-settings-slice';

const store = configureStore({
	reducer: {
		items: itemsSlice.reducer,
		banner: bannerSlice.reducer,
		square: squareSlice.reducer,
		screens: screensSlice.reducer,
		screenImages: screenImagesSlice.reducer,
		tabs: tabsSlice.reducer,
		generalSettings: generalSettingsSlice.reducer,
	},
});

export default store;
