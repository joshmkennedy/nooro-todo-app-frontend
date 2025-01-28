"use server";
import { revalidatePath } from "next/cache";
import { TaskDTO } from "./types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

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

export async function signin(email: string, password: string) {
  const response = await fetch("http://localhost:3100/auth/signin", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  }).then(async (res) => {
    if (res.ok) {
      const cookieData = await getSetToken(res);
      if (cookieData) {
        (await cookies()).set(cookieData);
      }

      return res.json();
    }
    throw new Error(res.statusText);
  });
  if (response) {
    redirect("/");
  }
}

export async function signout() {
  (await cookies()).set("token", "");
  await fetch(`http://localhost:3100/auth/signout`, { method: "POST" });
  console.log("here");
  redirect("/signin");
}

export async function getToken() {
  const token = (await cookies()).get("token");
  return token?.value;
}


export async function getSetToken(response:Response) {
  const setCookies = response.headers.getSetCookie();
  const cookiekeyval = setCookies
    .find((cookieStr) => cookieStr.startsWith("token="))
    ?.split(";")
    .map((part) => part.split("="));
  if (!cookiekeyval) throw new Error("Unexpected Error");

  const cookieData = cookiekeyval.reduce(
    (data, keyval) => {
      if (keyval[0] == "token") {
        data.name = "token";
        data.value = keyval[1];
      }
      if (keyval[0] == "Max-Age") {
        data.maxAge = parseInt(keyval[1]);
      }
      if (keyval[0] == "Path") {
        data.path = keyval[1];
      }
      if (keyval[0] == "HttpOnly") {
        data.httpOnly = true;
      }

      return data;
    },
    {} as ResponseCookie,
  );
	return cookieData
}
