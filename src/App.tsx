// src/App.tsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./routes/PrivateRoute";
import { RootState } from "./store/store";

const PublicLayout = lazy(() => import("./components/PublicLayout"));
const PrivateLayout = lazy(() => import("./components/PrivateLayout"));
// Lazy-loaded pages
const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const JobCard = lazy(() => import("./pages/JobCard/Create/JobCard"));
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
const JobCardsList = lazy(
  () => import("pages/JobCard/JobCardsList/JobCardsList")
);
const Register = lazy(() => import("./pages/Register/Register"));

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

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
            <PrivateRoute isAuthenticated={isAuthenticated} allowedRoles={['admin']}>
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
          <Route path="create-job-cards" element={<JobCard />} />
          <Route path="job-cards" element={<JobCardsList />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
