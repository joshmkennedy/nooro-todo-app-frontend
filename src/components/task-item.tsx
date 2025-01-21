import Link from "next/link";

import CompletionStatus from "./completion-status";

import { TaskDTO } from "@/types";
import { deleteTask } from "@/server-api";
import TrashIcon from "./trash-icon";

const completeText = "text-theme-gray-100 line-through"
const uncompletedText = ""

export default async function TaskItem({ task }: { task: TaskDTO }) {
	return (
		<div className="flex items-start gap-3 w-full p-4 rounded-lg border-theme-gray-200 border bg-theme-gray-300">
			<CompletionStatus status={task.completed} id={task.id} />
			<Link
				href={`/${task.id}`}
				className="flex-1 flex items-start gap-1 "
			>
				<h3 className={`${task.completed ? completeText : uncompletedText} text-sm `}>{task.title}</h3>
			</Link>
			<button
				className="text-theme-gray-100 hover:text-danger  hover:bg-theme-gray-200 rounded-sm py-.5 aspect-square"
				onClick={async ()=>{
					'use server'
					await deleteTask(task.id)
				}}
			><span><TrashIcon/></span></button>
		</div>
	);
}
