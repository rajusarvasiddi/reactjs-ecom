// src/App.tsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateLayout from "./components/PrivateLayout";
import PrivateRoute from "./routes/PrivateRoute";
import PublicLayout from "./components/PublicLayout";

// Lazy-loaded pages
const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const JobCard = lazy(() => import("./pages/JobCard/JobCard"));
const GarageCreate = lazy(
  () => import("./pages/admin/Garage/Create/CreateGarage")
);
const MechanicCreate = lazy(
  () => import("./pages/Mechanic/Create/CreateMechanic")
);
const Products = lazy(() => import("./pages/Products/Products"));
const ProductDetails = lazy(
  () => import("./pages/ProductDetails/ProductDetails")
);
const MyAccount = lazy(() => import("./pages/admin/MyAccount/MyAccount"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const MechanicList = lazy(() => import("./pages/Mechanic/MechanicList"));
const GarageList = lazy(
  () => import("./pages/admin/Garage/ShowGarages/GaragesList")
);
const Register = lazy(() => import("./pages/Register/Register"));

// Mock auth check
const isAuthenticated = true;

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Protected routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <PrivateLayout />
            </PrivateRoute>
          }
        >
          <Route path="my-account/*" element={<MyAccount />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="garage-create" element={<GarageCreate />} />
          <Route path="garage-list" element={<GarageList />} />
          <Route path="mechanic-create" element={<MechanicCreate />}></Route>
          <Route path="mechanics" element={<MechanicList />} />
          <Route path="job-cards" element={<JobCard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
