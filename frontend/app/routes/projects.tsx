import { useAuth } from "~/context/auth-context";
import type { Route } from "./+types/home";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { ProjectsPage } from "~/pages/projects/projects-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Your Projects - Vera" },
    { name: "description", content: "All of your personal Project's" },
  ];
}

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <ProjectsPage />
      <Link to="/">
        <Button variant="link" size="lg">Back to home</Button>
      </Link>
    </main>
  );
}
