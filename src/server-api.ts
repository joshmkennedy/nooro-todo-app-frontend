"use server";
import { revalidatePath } from "next/cache";
import { TaskDTO } from "./types";
import { cookies } from "next/headers";

export async function getTasks() {
  const token = await getToken();
  const response = (await fetch(`http://localhost:3100/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => data.json())) as {
    success: boolean;
    data: TaskDTO[];
    error?: string;
  };
  return response;
}

export async function updateTask(
  id: number,
  data: Partial<TaskDTO>,
): Promise<TaskDTO> {
  const token = await getToken();
  const res = await fetch(`http://localhost:3100/tasks/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
  revalidatePath("/");
  return res;
}

export async function getTask(id: number) {
  const token = await getToken();
  const result = (await fetch(`http://localhost:3100/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  }).then((data) => data.json())) as { success: boolean; data: TaskDTO };
  const task = result?.data;
  return task;
}

export async function newTask(
  data: Omit<TaskDTO, "id" | "completed">,
): Promise<TaskDTO> {
  const token = await getToken();

  const res = await fetch(`http://localhost:3100/tasks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  }).then((data) => data.json());
  revalidatePath("/");
  return res;
}

export async function deleteTask(id: number): Promise<void> {
  const token = await getToken();
  await fetch(`http://localhost:3100/tasks/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: { Authorization: `Bearer ${token}` },
  });
  revalidatePath("/");
  return;
}

export async function getToken() {
  const token = (await cookies()).get("token");
  return token?.value;
}
