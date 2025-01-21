import TaskList from "@/components/task-list"
import TaskStatus from "@/components/task-status"
import type {TaskDTO} from "@/types"

export default async function Home() {
	const result = await fetch(`http://localhost:3100/tasks`).then(data=>data.json()) as {success:boolean, data:TaskDTO[]}
	const tasks = result.data
	const completedCount:number = tasks.reduce((acc:number,task:TaskDTO)=>task.completed ? acc+1 : acc, 0)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

			<TaskStatus total={tasks.length} completedCount={completedCount}/>

			<TaskList tasks={tasks}/>

    </div>
  );
}
