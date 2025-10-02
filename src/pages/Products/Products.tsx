import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import { TOTAL_NO_OF_PAGES } from "../../constants";
import "./Products.css";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [maxLoadedPage, setMaxLoadedPage] = useState(1);
  const [batchIndex, setBatchIndex] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = TOTAL_NO_OF_PAGES;

  useEffect(() => {
    const fetchProducts = async () => {
      const skip = batchIndex * 100;
      try {
        const res = await axios.get("https://dummyjson.com/products", {
          params: { limit: 100, skip },
        });
        setProducts((prev) => [...prev, ...res.data.products]);
        if (batchIndex === 0) {
          setTotalProducts(res.data.total);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [batchIndex]);

  useEffect(() => {
    const pagesLoaded = (batchIndex + 1) * 10;
    const maxPages = Math.ceil(totalProducts / productsPerPage);

    if (
      currentPage > pagesLoaded &&
      products.length < totalProducts &&
      currentPage <= maxPages
    ) {
      setBatchIndex((prev) => prev + 1);
    }
  }, [currentPage, products, totalProducts]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <div className="products-page">
        <div className="product-grid">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {currentProducts && currentProducts.length > 0 ? (
          <Pagination
            currentPage={currentPage}
            totalItems={products.length}
            itemsPerPage={productsPerPage}
            onPageChange={setCurrentPage}
            totalAvailable={totalProducts}
          />
        ) : (
          "NO PRODUCTS FOUND"
        )}
      </div>
    </>
  );
};

export default Products;
