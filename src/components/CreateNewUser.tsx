import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUsersActions } from "../hooks/useUsersActions";

export function CreateNewUser() {
	const { addUser } = useUsersActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setResult(null);

		const form = event.currentTarget;
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			return setResult("ko");
		}

		addUser({ name, email, github });
		form.reset();
	};

	return (
		<Card style={{ marginTop: "16px" }}>
			<Title>Create New User</Title>
			<form onSubmit={handleSubmit} className="">
				<TextInput name="name" placeholder="Name" />
				<TextInput name="email" placeholder="Email" />
				<TextInput name="github" placeholder="Github username" />
				<div>
					<Button style={{ marginTop: "16px" }}>Create User</Button>
				</div>
				<span>
					{result === "ok" && <Badge color="green">Successfully Save</Badge>}
					{result === "ko" && <Badge color="red">an error ocurred</Badge>}
				</span>
			</form>
		</Card>
	);
}
