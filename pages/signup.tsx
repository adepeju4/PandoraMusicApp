import AuthForm from "../components/authForm";

export default function Signup() {
  return (
    <div>
      <AuthForm mode="signup" />
    </div>
  );
}

Signup.authPage = true;
