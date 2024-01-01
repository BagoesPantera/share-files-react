import {createBrowserRouter, Router} from "react-router-dom";

// Layouts
import MainLayout from "./layouts/main";

// Pages
import Home, {action as homeAction} from './pages/home'
import About from "./pages/about";

const router: Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                action: homeAction,
                element: <Home />,
            },
            {
                path: "about",
                element: <About />
            }
        ]
    }
]);

export default router;