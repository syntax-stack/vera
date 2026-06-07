import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vera" },
    { name: "description", content: "Manage your issues" },
  ];
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-lg font-semibold"><span className="text-xl font-bold tracking-tighter">Vera&apos;s</span> Homepage and Navigation</h1>

      {/* TODO: This can be easily hidden with a is user logged in check in the future */}
      {/* <Link to="/login">
        <Button variant="link" size="lg">Link to login</Button>
      </Link> */}
      <Button variant="link" disabled={true} asChild={true} size="lg">
        <Link to="/login">Link to login</Link>
      </Button>

      <Link to="/profile">
        <Button variant="link" size="lg">Link to profile</Button>
      </Link>

      <Link to="/projects">
        <Button variant="link" size="lg">Link to projects</Button>
      </Link>
    </main>

    // px-0! py-0!
  );
}
