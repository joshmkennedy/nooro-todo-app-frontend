"use client";
import { updateTask } from "@/server-api";
import { useState } from "react";

export default function CompletionStatus({
	status: initialStatus,
	id,
}: {
	status: boolean;
	id: number;
}) {
	const [status, setStatus] = useState(initialStatus);
	return (
		<form>
			<input
				checked={status}
				type="checkbox"
				onChange={async () => {
					const task = await updateTask(id, { completed: !status });
					if (task) {
						setStatus(task.completed);
					}
				}}
			/>
		</form>
	);
}
