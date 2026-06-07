import { useAuth } from "~/context/auth-context";
import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile - Vera" },
    { name: "description", content: "Your Vera account's personal profile" },
  ];
}

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <p>{user?.email}</p>
      <p>{user?.id}</p>
      <Link to="/">
        <Button variant="link" size="lg">Back to home</Button>
      </Link>
    </main>
  );
}
