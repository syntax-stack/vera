import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/context/auth-context";
import LoadingEmpty from "./loading-empty";
import { toast } from "sonner";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingEmpty />;

  if (!user) {
    toast.error("You need to be logged in for this action!", { position: "top-center", closeButton: true });
    return <Navigate to="/login" replace />;
  } 

  return <Outlet />;
}