import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/app.css";
import { AppProviders } from "@/app/providers/AppProviders";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("#root element not found");

createRoot(rootEl).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>
);
