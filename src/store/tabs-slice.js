import { createSlice } from '@reduxjs/toolkit';
import { icons } from '../utils/icons';

const tabsSlice = createSlice({
	name: 'tabs',
	initialState: {
		showSearchBar: true,
		tabs: [
			{ id: 1, name: 'الرئيسية', icon: 'mobileHome' },
			{ id: 2, name: 'الطلبات', icon: 'orders' },
			{ id: 3, name: 'الحساب', icon: 'account' },
			{
				id: 4,
				name: 'أخرى',
				icon: 'other',
				subTabs: [
					{ id: 5, name: 'الصفحات التعريفية', icon: 'page' },
					{ id: 6, name: 'اللغة', icon: 'language' },
					{ id: 7, name: 'العملة', icon: 'dollar' },
				],
			},
		],
	},
	reducers: {
		toggleSwitchValue(state) {
			state.showSearchBar = !state.showSearchBar;
		},
		reOrderTabs(state, action) {
			state.tabs = action.payload;
		},
		reOrderSubTabs(state, action) {
			const otherTab = state.tabs.filter((tab) => tab.id === 4);
			const newOtherTab = { ...otherTab[0] };
			newOtherTab.subTabs = action.payload;
			state.tabs.splice(state.tabs.indexOf(otherTab[0]), 1, newOtherTab);
		},
	},
});

export const tabsActions = tabsSlice.actions;
export default tabsSlice;
