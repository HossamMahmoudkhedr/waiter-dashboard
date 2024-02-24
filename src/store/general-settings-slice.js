import { createSlice } from '@reduxjs/toolkit';

const generalSettingsSlice = createSlice({
	name: 'generalSettings',
	initialState: {
		generalSettings: [
			{
				id: 1,
				name: 'الطلبات',
				options: [
					{ id: 1, name: 'السماح باضافة ملاحظة على الطلب', value: true },
					{ id: 2, name: 'تفعيل إعادة الطلب', value: true },
				],
			},
			{
				id: 2,
				name: 'كوبونات التخفيض',
				options: [{ id: 1, name: 'عرض تبويب التخفيضات', value: true }],
			},
			{
				id: 3,
				name: 'التقييمات',
				options: [{ id: 1, name: 'إخفاء التقييمات', value: false }],
			},
		],
	},
	reducers: {
		toggleSwitchValue(state, action) {
			state.generalSettings[action.payload.parentIndex].options[
				action.payload.index
			].value =
				!state.generalSettings[action.payload.parentIndex].options[
					action.payload.index
				].value;
		},
	},
});

export const generalSettingsActions = generalSettingsSlice.actions;
export default generalSettingsSlice;
