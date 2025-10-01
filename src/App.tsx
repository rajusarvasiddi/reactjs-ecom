import { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const MainLayout = lazy(() => import("./components/MainLayout"));
const Products = lazy(() => import("./pages/Products/Products"));
const ProductDetails = lazy(
  () => import("./pages/ProductDetails/ProductDetails")
);

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Login page without Layout */}
          <Route path="/login" element={<Login />} />

          {/* Pages with Layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
