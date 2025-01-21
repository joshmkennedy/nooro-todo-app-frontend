import NoTasks from "./no-tasks";
import TaskItem from "./task-item";

import type { TaskDTO } from "@/types";

export default async function TaskList({ tasks }: { tasks: TaskDTO[] }) {
	console.log(tasks)
	if(!tasks || tasks.length === 0) {
		return <NoTasks/>
	}
	return (
		<ul>
			{tasks.length ? (
				tasks.map((task) => (
					<li key={task.id}>
						<TaskItem task={task} />
					</li>
				))
			) : (
				<p>Get Started by adding some tasks</p>
			)}
		</ul>
	);
}
