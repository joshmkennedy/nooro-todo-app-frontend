import { redirect } from "next/navigation";

import TaskForm from "@/components/task-form";
import { newTask } from "@/server-api";
import BackLink from "@/components/back-link";
import PlusIcon from "@/components/elements/icons/plus-icon";
import { FullWidthButton } from "@/components/elements/full-width-button";

export default async function NewTask() {
  return (
    <div className="flex flex-col gap-6 mt-16">
      <BackLink />
      <form
        className="min-w-full flex flex-col gap-12"
        action={async (data: FormData) => {
          "use server";
          await newTask({
            title: data.get("title")?.toString() ?? "",
            color: data.get("color")?.toString() ?? "",
          });
          redirect("/");
        }}
      >
        <TaskForm />
				<FullWidthButton>
					Add Task <span><PlusIcon/></span>
				</FullWidthButton>
      </form>
    </div>
  );
}
