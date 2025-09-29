// src/App.tsx

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LandingPage from "./pages/landing/LandingPage";
import FeaturesPage from "./pages/features/FeaturesPage";
import PricingPage from "./pages/pricing/PricingPage";
import ContactPage from "./pages/contact/ContactPage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import TermsOfServicePage from "./pages/terms/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/privacy/PrivacyPolicyPage";

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
      { path: "features", element: <FeaturesPage /> },
      { path: "pricing", element: <PricingPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "terms", element: <TermsOfServicePage /> },
      { path: "privacy", element: <PrivacyPolicyPage /> },
    ],
  },
]);

function App() {
  // The RouterProvider makes the router available to the entire app
  return <RouterProvider router={router} />;
}

export default App;