import AuthForm from "../components/authForm";

export default function Signup() {
  return (
    <div>
      <AuthForm mode="signin" />
    </div>
  );
}

Signup.authPage = true;
