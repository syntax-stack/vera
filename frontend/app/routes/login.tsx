import type { Route } from "./+types/home";
import { LoginPage } from "../pages/login/login-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - Vera" },
    { name: "description", content: "Login to your account" },
  ];
}

export default function Login() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <LoginPage />
    </main>
  );
}
