import { newTask } from "@/server-api";
import { TaskDTO } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewTask() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<Link href="/">Home</Link>
			<form
				className="min-w-[900]"
				action={async (data: FormData) => {
					"use server";
					await newTask({
						title: data.get("title")?.toString(),
						completed: data.has("completed"),
						color: data.get("color")?.toString(),
					});
					redirect("/");
				}}
			>
				<input
					name="completed"
					type="checkbox"
				/>
				<input
					name="title"
					className="bg-slate-900 text-lg p-4 min-w-full"
				/>
				<input name="color" type="color" />
				<button>Save</button>
			</form>
		</div>
	);
}
