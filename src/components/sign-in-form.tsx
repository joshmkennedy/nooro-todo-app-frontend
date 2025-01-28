"use client";
import FormInputWrapper from "@/components/form-input-wrapper";
import { signin } from "@/server-api";
import { useActionState } from "react";
import { InputError } from "./input-error";

type ActionResult = {
  error: string;
  email?: string;
  password?: string;
};
async function _action(prevState: ActionResult, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  if (!email) {
    return {
      error: "Email is required",
			password:password ?? "",
    };
  }
  if (!password) {
    return {
			email: email,
      error: "Passowrd Is Required",
    };
  }

  const result: ActionResult = (await signin(email, password).catch()) ?? {
    error: "",
  };
  result.email = email;
  result.password = password;

  return result;
}

const initialState: ActionResult = {
  error: "",
  password: "",
  email: "",
};

export function SignInForm() {
  const [state, action, isPending] = useActionState<ActionResult>(
    _action,
    initialState,
  );
  console.log(state.error);
  return (
    <>
      <form action={action} className="flex flex-col gap-6 px-4 md:px-0">
				<div className="-mt-6 pb-6">
        <InputError message={state.error} />
				</div>

        <FormInputWrapper name={"email"} label={"Email"}>
          <input
            className="border border-theme-gray-200 rounded-lg text-sm p-4 text-foreground bg-theme-gray-300 placeholder:text-theme-gray-100"
            defaultValue={state.email}
            type="email"
            name="email"
            id="email"
          />
        </FormInputWrapper>
        <FormInputWrapper label={"Password"} name={"password"}>
          <input
            defaultValue={state.password}
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
