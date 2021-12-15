import fetcher from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  body: { firstName: String; lastName: String; email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};
