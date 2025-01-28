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
      <form action={signin}>
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />
        <button>Signin</button>
      </form>
    </>
  );
}
