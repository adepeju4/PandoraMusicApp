import AuthForm from "../components/authForm";

export default function Signin() {
  return (
    <div>
      <AuthForm mode="signin" />
    </div>
  );
}

Signin.authPage = true;
