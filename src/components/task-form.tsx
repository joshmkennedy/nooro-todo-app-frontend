"use client";
import { TaskDTO } from "@/types";
import FormInputWrapper from "./form-input-wrapper";
import CustomColorPicker from "./custom-color-picker";

export default function TaskForm({
  task,
}: {
  task?: Partial<TaskDTO>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <FormInputWrapper label="Title" name="title">
        <input
          name="title"
          type="text"
					required
          defaultValue={task?.title}
          placeholder="Ex: Brush your teeth"
          className="border border-theme-gray-200 rounded-lg text-sm p-4 text-foreground bg-theme-gray-300 placeholder:text-theme-gray-100"
        />
      </FormInputWrapper>

      <FormInputWrapper label="Color" name="color">
        <CustomColorPicker
          name="color"
          color={task?.color ?? ""}
          options={[
            { name: "Red", value: "#FF3B2F" },
            { name: "Orange", value: "#FF9500" },
            { name: "Yellow", value: "#FFCC00" },
            { name: "Green", value: "#34C759" },
            { name: "Blue", value: "#007AFF" },
            { name: "Indigo", value: "#5856D6" },
            { name: "Purple", value: "#AF52DE" },
            { name: "Pink", value: "#FF2D55" },
            { name: "Brown", value: "#A2845E" },
          ]}
        />
      </FormInputWrapper>
    </div>
  );
}
