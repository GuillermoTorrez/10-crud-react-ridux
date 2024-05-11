import { useAppDispatch } from "../hooks/store";
import {
	addNewUser,
	deleteUserById,
	type User,
	type UserId,
} from "../store/users/slice";

export const useUsersActions = () => {
	const dispatch = useAppDispatch();

	const addUser = (userData: User) => {
		dispatch(addNewUser(userData));
	};

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	return { removeUser, addUser };
};
