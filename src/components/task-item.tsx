import { TaskDTO } from "@/types";
import CompletionStatus from "./completion-status"

export default async function TaskItem({ task }: { task: TaskDTO }) {
	return (
		<div className="flex items-center gap-4">
			<CompletionStatus status={task.completed} id={task.id} />
			<div className="flex items-start gap-1">
				<h3>{task.title}</h3>
				<div
					style={{ background: task.color }}
					className="w-2 h-2 rounded-full"
				></div>
			</div>
		</div>
	);
}

