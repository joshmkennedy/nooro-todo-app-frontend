import type { TaskDTO } from "@/types";
import TaskItem from "./task-item";

export default async function TaskList({ tasks }: { tasks: TaskDTO[] }) {
	return (
		<ul>
			{tasks.length ? (
				tasks.map((task) => (
					<li key={task.id}>
						<TaskItem task={task}/>
					</li>
				))
			) : (
				<p>Get Started by adding some tasks</p>
			)}
		</ul>
	);
}
