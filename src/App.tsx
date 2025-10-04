// src/App.tsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateLayout from "./components/PrivateLayout";
import PrivateRoute from "./PrivateRoute";
import PublicLayout from "./components/PublicLayout";

// Lazy-loaded pages
const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const GarageCreate = lazy(() => import("./pages/Garage/Create/CreateGarage"));
const Products = lazy(() => import("./pages/Products/Products"));
const ProductDetails = lazy(
  () => import("./pages/ProductDetails/ProductDetails")
);
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Cart = lazy(() => import("./pages/Cart/Cart"));

// Mock auth check
const isAuthenticated = true;

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route element={<PublicLayout />}>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Protected routes */}
        <Route
          path="/app/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <PrivateLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Home />} />
          <Route path="garage-create" element={<GarageCreate />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
