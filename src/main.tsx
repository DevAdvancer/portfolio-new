import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import AccessibilityProvider from "./components/AccessibilityProvider";
import "./index.css";
import "./portfolio.css";

const root = document.getElementById("root")!;
const app = (
  <AccessibilityProvider>
    <App />
  </AccessibilityProvider>
);
if (root.childElementCount > 0) hydrateRoot(root, app);
else createRoot(root).render(app);
