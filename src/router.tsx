import {createBrowserRouter, Router} from "react-router-dom";

// Pages
import Home, {action as homeAction} from './pages/home'

const router: Router = createBrowserRouter([
    {
        path: "/",
        action: homeAction,
        element: <Home />,
    },
]);

export default router;