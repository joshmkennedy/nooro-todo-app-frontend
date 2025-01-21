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
				onChange={async (e) => {
					e.stopPropagation()
					// make it feel instant
					setStatus((s) => !s);
					await updateTask(id, { completed: !status }).catch(() =>
						// set it back if we fail
						setStatus((s) => !s)
					); 
				}}
			/>
		</form>
	);
}
