import Link from "next/link";

import TaskList from "@/components/task-list";
import TaskStatus from "@/components/task-status";

import type { TaskDTO } from "@/types";
import PlusIcon from "@/components/plus-icon";

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
    <>
      <Link
        href="/new"
        className=" gap-2 w-full flex justify-center items-center px-3 text-btn font-regular py-4 bg-theme-blue-base text-foreground rounded-sm hover:bg-theme-blue-light -mt-8"
      >
        Create Task
        <PlusIcon />
      </Link>
			<div className="mt-16 flex flex-col gap-6">
      <TaskStatus total={tasks.length} completedCount={completedCount} />
      <TaskList tasks={tasks} />
			</div>
    </>
  );
}
