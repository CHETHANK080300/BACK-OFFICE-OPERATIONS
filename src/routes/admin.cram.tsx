import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/cram")({
  beforeLoad: ({ location }) => {
    // Simple RBAC simulation
    const isAuthenticated = true; // In real app, check auth context/service
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: CramLayout,
});

function CramLayout() {
  return <Outlet />;
}
