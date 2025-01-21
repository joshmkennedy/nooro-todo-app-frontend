'use server'

import { TaskDTO } from "./types";

export async function updateTask(id:number, data:Partial<TaskDTO>): Promise<TaskDTO>{
	const res = await fetch(`http://localhost:3100/tasks/${id}`, {
		method:"PUT",
		headers: {
			"Content-Type": "application/json"	
		},
		body:JSON.stringify(data)
	}).then((data)=>data.json())

	return res 
}
