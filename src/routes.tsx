import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import SongsList from "./components/SongsList";

const router = createBrowserRouter([
    { path: "/", element: <Layout />, children: [
        { path: "", element: <SongsList /> }
    ]}
])

export default router;