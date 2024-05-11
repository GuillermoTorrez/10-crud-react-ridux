import { Tuple, configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import type { UserWithId } from "./users/slice";
import usersReducer, { rollbackUser } from "./users/slice";

export type RootState = ReturnType<typeof store.getState>;

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action;
	const previousState = store.getState();
	next(action);

	if (type === "users/deleteUserById") {
		console.log("here");
		const userIdToRemove = payload;
		const userToRemove = previousState.users.find(
			(user: UserWithId) => user.id === userIdToRemove,
		);

		fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					toast.success(`User ${userIdToRemove} sucessfully deleted`);
				}
				throw new Error("Error when you trying to delete user");
			})
			.catch((err) => {
				toast.error(`Error deleting user ${userIdToRemove}`);
				if (userToRemove) store.dispatch(rollbackUser(userToRemove));
				console.log(err);
			});
	}
};

export const store = configureStore({
	reducer: { users: usersReducer },

	middleware: () =>
		new Tuple(persistanceLocalStorageMiddleware, syncWithDatabase),
});

export type AppDispatch = typeof store.dispatch;
