import App from "App";
import AdminPage from "components/pages/adminPage/AdminPage";
import { RouteObject } from "react-router";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "manage",
				element: <AdminPage />,
			},
			{
				path: "not-found",
				element: <div>Not found</div>,
			},
			{
				path: "server-error",
				element: <div>ServerError</div>,
			},
			{
				path: "*",
				element: <Navigate replace to={"not-found"} />,
			},
		],
	},
];

export const router = createBrowserRouter(routes);
