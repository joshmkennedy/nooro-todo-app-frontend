import { TaskDTO } from "@/types";
import CompletionStatus from "./completion-status"
import Link from "next/link";

export default async function TaskItem({ task }: { task: TaskDTO }) {
	return (
		<div className="flex items-center gap-4 w-full">
			<CompletionStatus status={task.completed} id={task.id} />
			<Link className="flex-1" href={`/${task.id}`} className="flex-1 flex items-start gap-1">
				<h3>{task.title}</h3>
				<div
					style={{ background: task.color }}
					className="w-2 h-2 rounded-full"
				></div>
			</Link>
		</div>
	);
}

