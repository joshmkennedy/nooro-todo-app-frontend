import { notFound, redirect } from "next/navigation";

import TaskForm from "@/components/task-form";
import { getTask, updateTask } from "@/server-api";
import CheckMark from "@/components/elements/icons/checkmark-icon";
import BackLink from "@/components/back-link";
import { FullWidthButton } from "@/components/elements/full-width-button";

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
				<FullWidthButton>
					Save
					<span className="w-5">
						<CheckMark />
					</span>
				</FullWidthButton>
			</form>
		</div>
	);
}
