import "@/lib/silence";
import { createRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react"
import App from "./App.tsx";
import "./index.css";
import "./i18n";

createRoot(document.getElementById("root")!).render(
    <>
        <App />
        <SpeedInsights />
    </>
);
