import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "./ThemeProvider";
import { router } from "../App";

export function AppProviders() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
