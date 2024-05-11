import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Guillermo Torrez",
		email: "guillermo.torrez@gmail.com",
		github: "guillermotorrez",
	},
	{
		id: "2",
		name: "Ivette Castillo",
		email: "sofia.ivette.castillo@gmail.com",
		github: "ivettecastillo",
	},
	{
		id: "3",
		name: "Sofia Carolina Torrez",
		email: "mysofia@gmail.com",
		github: "sofiacarolina",
	},
	{
		id: "4",
		name: "Miguel",
		email: "mduran@gmail.com",
		github: "midudev",
	},
	{
		id: "5",
		name: "De Jesus",
		email: "miramar",
	},
];

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: UserId;
}

// IIFE - inmediately Invoked Function Expression
const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			state.push({ id, ...action.payload });
			///return [...state, { id, ...action.payload }]; /// podes mutar el estado con redux toolkit
			/// si ves state.push({id, ...action.payload})
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);
			if (isUserAlreadyDefined) {
				return [...state, action.payload];
			}
		},
	},
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
