import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
	name: 'data',
	initialState: { data: {} },
	reducers: {
		addData(state, action) {
			return {
				...state,
				data: {
					...state.data,
					[action.payload.key]: action.payload.value,
				},
			};
		},
	},
});

export const dataActions = dataSlice.actions;
export default dataSlice;
