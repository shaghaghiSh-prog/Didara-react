import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion"; // Ensure motion is imported
import Navbar from "../../Header/Navbar/Navbar";

import Main from "../../Main/Mian";
import Footer from "../../Footer/Footer";
import Loader from "../../Loader/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

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
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <Main />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
