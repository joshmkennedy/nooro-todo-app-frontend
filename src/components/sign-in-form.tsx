"use client";
import FormInputWrapper from "@/components/form-input-wrapper";
import { signin } from "@/server-api";
import { useActionState } from "react";
import { InputError } from "./input-error";
import { InputField } from "./input-field";

type ActionResult = {
  error: string;
  email?: string;
  password?: string;
};
async function action(prevState: ActionResult, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  if (!email) {
    return {
      error: "Email is required",
      password: password ?? "",
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
  const [state, formAction, isPending] = useActionState<ActionResult>(
    action,
    initialState,
  );
  return (
    <>
      <form action={formAction} className="flex flex-col gap-6 px-4 md:px-0">
        <div className="-mt-6 pb-6">
          <InputError message={state.error} />
        </div>

        <FormInputWrapper name={"email"} label={"Email"}>
          <InputField
            defaultValue={state.email}
            inputType="email"
            name="email"
            id="email"
          />
        </FormInputWrapper>
        <FormInputWrapper label={"Password"} name={"password"}>
          <InputField
            name="password"
            inputType="password"
            id="password"
            defaultValue={state.password}
          />
        </FormInputWrapper>
        <button className=" gap-2 w-full flex justify-center items-center px-3 text-btn font-regular py-4 bg-theme-blue-base text-foreground rounded-sm hover:bg-theme-blue-light ">
          {!isPending ? "Sign in" : "Signing In"}
        </button>
      </form>
    </>
  );
}
