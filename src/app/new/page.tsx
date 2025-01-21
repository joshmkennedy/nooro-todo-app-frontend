import { redirect } from "next/navigation";

import TaskForm from "@/components/task-form";
import { newTask } from "@/server-api";
import BackLink from "@/components/back-link";
import PlusIcon from "@/components/plus-icon";

export default async function NewTask() {
  return (
    <div className="flex flex-col gap-6 mt-16">
      <BackLink />
      <form
        className="min-w-full flex flex-col gap-12"
        action={async (data: FormData) => {
          "use server";
					console.log(data.get("color"))
          await newTask({
            title: data.get("title")?.toString() ?? "",
            color: data.get("color")?.toString() ?? "",
          });
          redirect("/");
        }}
      >
        <TaskForm />
				<button className=" gap-2 w-full flex justify-center items-center px-3 text-btn font-regular py-4 bg-theme-blue-base text-foreground rounded-sm hover:bg-theme-blue-light ">
					Add Task <span><PlusIcon/></span>
				</button>
      </form>
    </div>
  );
}
