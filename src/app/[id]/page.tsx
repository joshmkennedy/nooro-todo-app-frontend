import TaskForm from "@/components/task-form";
import { getTask, updateTask } from "@/server-api";
import { TaskDTO } from "@/types";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function Task({
	params,
}: {
	params: Promise<{ id: number }>;
}) {
	const id = (await params).id;
	const task = await getTask(id);
	if (!task) return notFound();
	return (
		<>
			<Link href="/">Home</Link>
			<TaskForm
				task={task}
				action={async (data: FormData) => {
					"use server";
					await updateTask(id, {
						title: data.get("title")?.toString(),
						completed: data.has("completed"),
						color: data.get("color")?.toString(),
					});
					redirect("/");
				}}
			/>
		</>
	);
}
