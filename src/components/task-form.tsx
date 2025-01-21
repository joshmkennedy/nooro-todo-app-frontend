'use client'
import { TaskDTO } from "@/types";

export default function TaskForm({
	task,
	action,
}: {
	task: Partial<TaskDTO>;
	action: (formData: FormData) => void;
}) {
	return (
		<form
			className="min-w-[900]"
			action={action}
		>
			<input name="completed" type="checkbox" defaultChecked={task?.completed ?? false} />
			<input
				name="title"
				className="bg-slate-900 text-lg p-4 min-w-full"
				defaultValue={task?.title ?? ""}
			/>
			<input name="color" type="color" defaultValue={task?.color ?? "#ff00ff"} />
			<button>Save</button>
		</form>
	);
}
