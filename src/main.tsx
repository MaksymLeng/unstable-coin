import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./components/App/App"
import Main from "./pages/MainPage"
import Community from "./pages/Community"
import GraphsPage from "./pages/GraphsPage.tsx"
import Disclaimer from "./pages/Disclaimer"
import "./index.css"
import StoryPage from "@/pages/StoryPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Main /> },
            { path: "community", element: <Community /> },
            { path: "graphs", element: <GraphsPage /> },
            {path: "story", element: <StoryPage/>},
            { path: "disclaimer", element: <Disclaimer /> },
        ],
    },
])

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
