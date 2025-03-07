import React, { useEffect, useState } from "react";
import SmallLoader from "../../Loader/SmallLoader";

function Categories() {
  const [fetchedData, setFetchedData] = useState({ categories: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.didaraoptic.com/general/products?locale=fa"
        );

        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();

        setFetchedData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-2 mt-2 flex justify-center items-center">
        <SmallLoader />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <h2 className="text-3xl text-gray-500 font-black">دسته بندی محصولات</h2>
      </div>

      <div className="flex flex-wrap justify-center">
        {fetchedData.categories && fetchedData.categories.length > 0 ? (
          fetchedData.categories.map((product) => (
            <div
              key={product.id}
              className="w-56 m-2 flex flex-col items-center transition-transform hover:translate-y-[-10px] hover:rotate-[2deg] duration-300 shadow-lg hover:shadow-xl rounded-2xl"
            >
              <a
                className="rounded-2xl"
                href="/products?product_type=products&amp;sort=new&amp;category=طبی"
              >
                <img
                  className="rounded-2xl"
                  src={product.image.url}
                  alt={product.title || "Category image"}
                />
              </a>
            </div>
          ))
        ) : (
          <div className="text-center">No categories available.</div>
        )}
      </div>
    </div>
  );
}

export default Categories;
