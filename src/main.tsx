import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Layout from "@components/ux/layout"
import "./index.css"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Layout />
    </StrictMode>,
)
