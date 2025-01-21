import TaskList from "@/components/task-list";
import TaskStatus from "@/components/task-status";
import type { TaskDTO } from "@/types";
import Link from "next/link";

export default async function Home() {
	const result = (await fetch(`http://localhost:3100/tasks`).then((data) =>
		data.json(),
	)) as { success: boolean; data: TaskDTO[] };
	const tasks = result.data;
	const completedCount: number = tasks.reduce(
		(acc: number, task: TaskDTO) => (task.completed ? acc + 1 : acc),
		0,
	);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<header className="flex gap-4 items-center">
				<TaskStatus total={tasks.length} completedCount={completedCount} />
				<Link
					href="/new"
					className="py-1 px-3 text-sm font-bold bg-blue-800 text-white rounded-sm hover:bg-blue-700"
				>
					+New Task
				</Link>
			</header>

			<TaskList tasks={tasks} />
		</div>
	);
}
