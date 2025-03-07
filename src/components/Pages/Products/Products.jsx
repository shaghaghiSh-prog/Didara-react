import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Categories from "../../Main/Categories/Categories";
import Notice from "../../Main/Notice/Notice";
import DataFetcher from "./DataFetcher";
import Pagination from "../../Main/Products/Pagination";
import SortDropdown from "./SortDropdown";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "../../Loader/Loader";
import Navbar from "../../Header/Navbar/Navbar";

function Products() {
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("");
  const productsPerPage = 4;
  const [totalProducts, setTotalProducts] = useState(0);

  const paginate = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > Math.ceil(totalProducts / productsPerPage)
    )
      return;
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber);
  };

  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) setCurrentPage(Number(storedPage));
  }, []);

  const handleSort = (sortValue) => {
    setSortBy(sortValue);
  };

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // Show loader for 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // Optional: Add exit animation
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <div className="pt-32">
              <Notice />
            </div>
            <div className="px-4">
              <Categories />
            </div>

            <div className="container mx-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">محصولات</h1>
                <SortDropdown onSort={handleSort} />
              </div>

              <DataFetcher
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                setTotalProducts={setTotalProducts}
                sortBy={sortBy}
              />

              <Pagination
                productsPerPage={productsPerPage}
                totalProducts={totalProducts}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Products;
