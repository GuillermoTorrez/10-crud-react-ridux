import { Toaster } from "sonner";
import "./App.css";
import { CreateNewUser } from "./components/CreateNewUser";
import { ListOfUsers } from "./components/ListOfUser";

function App() {
	return (
		<>
			<ListOfUsers />
			<CreateNewUser />
			<div>
				<Toaster richColors />
			</div>
		</>
	);
}

export default App;
