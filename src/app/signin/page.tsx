import FormInputWrapper from "@/components/form-input-wrapper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function signin(formData: FormData) {
  "use server";
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  if (!email) {
    throw new Error("Email is required");
  }
  if (!password) {
    throw new Error("Password is required");
  }

  const response = await fetch("http://localhost:3100/auth/signin", {
    headers: {
      "Content-Type": "application/json",
    },

    method: "POST",
    body: JSON.stringify({ email, password }),
  }).then(async (res) => {
    if (res.ok) {
      const setCookies = res.headers.getSetCookie();
      console.log();
      console.log("includes a token");
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
        {} as {
          name: string;
          value: string;
          path: string;
          httpOnly?: boolean;
          maxAge: number;
        },
      );
      if (cookieData) {
        console.log(cookieData);
        console.log((await cookies()).set(cookieData));
      }

      return res.json();
    }
    throw new Error(res.statusText);
  });
  if (response) {
    console.log("should redirect");
    console.log((await cookies()).get("token"));
    redirect("/");
  }
}
export default function SignIn() {
  return (
    <>
      <form action={signin} className="flex flex-col gap-6">
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
          Sign in
        </button>
      </form>
    </>
  );
}
