// File: /frontend/src/App.tsx

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LandingPage from "./pages/landing/LandingPage";

// Define the application's routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Use MainLayout as the parent for this route group
    children: [
      {
        index: true, // This makes LandingPage the default child for "/"
        element: <LandingPage />,
      },
      // We can add more pages here later, e.g., /features, /pricing
      // { path: 'features', element: <FeaturesPage /> },
    ],
  },
  // We'll add other top-level routes like /chat or /login here later
  // { path: '/login', element: <LoginPage /> },
]);

function App() {
  // The RouterProvider makes the router available to the entire app
  return <RouterProvider router={router} />;
}

export default App;
