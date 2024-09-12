// src/components/ProductList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios
        .get("http://localhost:3001/flipkart/get")
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
          setLoading(false);
        });
    } catch (error) {
      setError("Error fetching products");
      setLoading(false);
    }
  };

  // Delete a product
  const handleDelete = async (listingId) => {
    try {
      await axios.delete(`http://localhost:3001/flipkart/unlist/${listingId}`);
      // Remove the product from the list after successful deletion
      setProducts(products.filter((product) => product._id !== listingId));
    } catch (error) {
      console.log("Error deleting product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Product Inventory
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Manage your product catalog with ease
          </p>
        </div>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="hidden sm:grid sm:grid-cols-5 bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
            <div className="p-4">Image</div>
            <div className="p-4">Title</div>
            <div className="p-4">Quantity</div>
            <div className="p-4">Price</div>
            <div className="p-4">Actions</div>
          </div>
          {products.length === 0 ? (
            <div>No products found</div>
          ) : (
            <>
              {products.map((product) => (
                <div
                  key={product._id}
                  className="grid grid-cols-2 sm:grid-cols-5 border-b border-gray-200 text-sm hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                >
                  <div className="p-4 flex items-center justify-center sm:justify-start">
                    <img
                      src={product.img}
                      alt={product.title}
                      //   width={60}
                      //   height={60}
                      className="rounded-md shadow-sm"
                    />
                  </div>
                  <div className="p-4 font-medium sm:border-l border-gray-200 flex items-center">
                    {product.title}
                  </div>
                  <div className="p-4 sm:border-l border-gray-200 flex items-center justify-end sm:justify-start">
                    <span className="sm:hidden font-medium mr-2">
                      Quantity:
                    </span>
                    {product.quantity}
                  </div>
                  <div className="p-4 sm:border-l border-gray-200 flex items-center justify-end sm:justify-start">
                    <span className="sm:hidden font-medium mr-2">Price:</span>$
                    {product.price.toFixed(2)}
                  </div>
                  <div className="p-4 col-span-2 sm:col-span-1 sm:border-l border-gray-200 flex items-center justify-center sm:justify-start space-x-2">
                    {/* <button
                      //   onClick={() => handleEdit(product.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out shadow-sm"
                    >
                      Edit
                    </button> */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out shadow-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
