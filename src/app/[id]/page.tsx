import { notFound, redirect } from "next/navigation";

import TaskForm from "@/components/task-form";
import { getTask, updateTask } from "@/server-api";
import CheckMark from "@/components/checkMark";
import BackLink from "@/components/back-link";

export default async function Task({
	params,
}: {
	params: Promise<{ id: number }>;
}) {
	const id = (await params).id;
	const task = await getTask(id);
	if (!task) return notFound();
	return (
		<div className="flex flex-col gap-6 mt-16">
			<BackLink />
			<form
				className="min-w-full flex flex-col gap-12"
				action={async (data: FormData) => {
					"use server";
					await updateTask(id, {
						title: data.get("title")?.toString(),
						completed: data.has("completed"),
						color: data.get("color")?.toString(),
					});
					redirect("/");
				}}
			>
				<TaskForm task={task} />
				<button className=" gap-2 w-full flex justify-center items-center px-3 text-btn font-regular py-4 bg-theme-blue-base text-foreground rounded-sm hover:bg-theme-blue-light ">
					Save
					<span className="w-5">
						<CheckMark />
					</span>
				</button>
			</form>
		</div>
	);
}
