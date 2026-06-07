import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),

  layout("components/protected-route.tsx", [
    route("profile", "routes/profile.tsx"),
    route("projects", "routes/projects.tsx"),
  ]),
] satisfies RouteConfig;
