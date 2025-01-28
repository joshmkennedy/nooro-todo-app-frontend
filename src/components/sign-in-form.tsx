"use client";
import FormInputWrapper from "@/components/form-input-wrapper";
import { signin } from "@/server-api";
import { useActionState } from "react";
import { InputError } from "./input-error";

async function _action(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  if (!email) {
    return {
      message: "Email is required",
    };
  }
  if (!password) {
    return { message: "Passowrd Is Required" };
  }

  const message = (await signin(email, password).catch((e) => e.message)) ?? "";
  return { message };
}

const initialState = {
  message: "",
};

export function SignInForm() {
  const [state, action, isPending] = useActionState<{ message: string }>(
    _action,
    initialState,
  );
  return (
    <>
      <form action={action} className="flex flex-col gap-6">
        {state.message && <InputError message={state.message} />}

        <FormInputWrapper name={"email"} label={"Email"}>
          <input
            className="border border-theme-gray-200 rounded-lg text-sm p-4 text-foreground bg-theme-gray-300 placeholder:text-theme-gray-100"
            type="email"
            name="email"
            id="email"
          />
        </FormInputWrapper>
        <FormInputWrapper label={"Password"} name={"password"}>
          <input
            className="border border-theme-gray-200 rounded-lg text-sm p-4 text-foreground bg-theme-gray-300 placeholder:text-theme-gray-100"
            type="password"
            name="password"
            id="password"
          />
        </FormInputWrapper>
        <button className=" gap-2 w-full flex justify-center items-center px-3 text-btn font-regular py-4 bg-theme-blue-base text-foreground rounded-sm hover:bg-theme-blue-light ">
          {!isPending ? "Sign in" : "Signing In"}
        </button>
      </form>
    </>
  );
}
