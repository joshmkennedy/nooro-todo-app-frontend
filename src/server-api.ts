"use server";

import { revalidatePath } from "next/cache";
import { TaskDTO } from "./types";
import { cookies } from "next/headers";

export async function updateTask(
  id: number,
  data: Partial<TaskDTO>,
): Promise<TaskDTO> {
	const token = (await cookies()).get("token")
  const res = await fetch(`http://localhost:3100/tasks/${id}`, {
    method: "PUT",
    headers: {
			"Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
  revalidatePath("/");
  return res;
}

export async function getTask(id: number) {
  const result = (await fetch(`http://localhost:3100/tasks/${id}`, {
    credentials: "include",
  }).then((data) => data.json())) as { success: boolean; data: TaskDTO };
  const task = result?.data;
  return task;
}

export async function newTask(
  data: Omit<TaskDTO, "id" | "completed">,
): Promise<TaskDTO> {
  const res = await fetch(`http://localhost:3100/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
		credentials:'include',
    body: JSON.stringify(data),
  }).then((data) => data.json());
  revalidatePath("/");
  return res;
}

export async function deleteTask(id: number): Promise<void> {
  await fetch(`http://localhost:3100/tasks/${id}`, {
    method: "DELETE",
		credentials:'include',
  });
  revalidatePath("/");
  return;
}
