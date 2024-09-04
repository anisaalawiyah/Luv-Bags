import { useState, useEffect } from "react";
import { Trash, SquarePen, PlusCircle, Search, X } from "lucide-react";
import HeaderAdmin from "../components/HeaderAdmin";
import Cookies from "js-cookie";

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  const [sortBy, setSortBy] = useState("product_id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch products, status: " + response.status
          );
        }
        return response.json();
      })
      .then((products) => setProducts(products))
      .catch((error) => {
        console.error("Error fetching products:", error.message);
        alert("There was a problem fetching products. Please try again.");
      });
  }, []);

  function handleDelete(product) {
    if (confirm("Are you sure you want to delete this product?")) {
      fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/${
          product.product_id
        }`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Failed to delete product, status: " + response.status
            );
          }
          return response.text();
        })
        .then((message) => {
          setProducts((prevProducts) =>
            prevProducts.filter((p) => p.product_id !== product.product_id)
          );
          alert(message);
        })
        .catch((error) => {
          console.error("Error deleting product:", error.message);
          alert("There was a problem deleting the product. Please try again.");
        });
    }
  }

  function saveUpdate() {
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/products/${
        updateProduct.product_id
      }`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        },
        body: JSON.stringify(updateProduct),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to update product, status: " + response.status
          );
        }
        return response.json();
      })
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.product_id === updateProduct.product_id ? updateProduct : p
          )
        );
      })
      .catch((error) => {
        console.error("Error updating product:", error.message);
        alert("There was a problem updating the product. Please try again.");
      });
    setUpdateProduct(null);
  }

  function handleAddNewProduct() {
    if (
      !newProduct.product_name ||
      !newProduct.brand ||
      !newProduct.price ||
      !newProduct.stock ||
      !newProduct.imageurl
    ) {
      alert("All fields must be filled out");
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("token"),
        
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
          .then((response) => response.json())
          .then((products) => setProducts(products));
      });

    setNewProduct(null);
  }

  const filterData = products
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter((item) => {
      return (
        item.product_name &&
        item.product_name.toLowerCase().includes(search.toLowerCase())
      );
    });

  return (
    <>
      <HeaderAdmin />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex flex-col md:flex-row items-center md:justify-between mb-6">
          <button
            onClick={() =>
              setNewProduct({
                product_name: "",
                brand: "",
                price: "",
                stock: "",
                imageurl: "",
              })
            }
            className="flex items-center gap-2 p-4 bg-stone-600 text-white rounded-lg shadow-lg"
          >
            <PlusCircle /> Add
          </button>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-2 border rounded-lg overflow-hidden">
              <Search className="ml-2" />
              <input
                type="text"
                className="p-2 bg-white border-none w-full outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
              />
            </div>
            <label className="flex items-center gap-2">
              <span>Sort by</span>
              <select
                className="rounded-lg border-2 border-gray-300 h-10 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="product_id">ID</option>
                <option value="product_name">Name</option>
                <option value="price">Price</option>
              </select>
            </label>
            <label className="flex items-center gap-2">
              <span>Order</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="h-10 p-2 text-sm rounded-lg border-2 border-gray-300"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gradient-to-r from-cyan-500 via-zinc-700 to-sky-900 text-white">
              <tr>
                <th className="p-4 border-b">ID</th>
                <th className="p-4 border-b">Image</th>

                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Brand</th>
                <th className="p-4 border-b">Price</th>
                <th className="p-4 border-b">Stock</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterData.map((product) => (
                <tr key={product.product_id}>
                  <td className="p-4 border-b">{product.product_id}</td>

                  <td className="p-4 border-b">
                    <img
                      src={product.imageurl}
                      alt={product.product_name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="p-4 border-b">{product.product_name}</td>
                  <td className="p-4 border-b">{product.brand}</td>
                  <td className="p-4 border-b">Rp.{product.price}</td>
                  <td className="p-4 border-b">{product.stock}</td>
                  <td className="p-4 border-b flex justify-around">
                    <button
                      onClick={() => handleDelete(product)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash />
                    </button>
                    <button
                      onClick={() => setUpdateProduct(product)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <SquarePen />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {(updateProduct || newProduct) && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-full sm:w-1/2 md:w-1/3 relative">
              <button
                onClick={() => {
                  setUpdateProduct(null);
                  setNewProduct(null);
                }}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
              <h2 className="text-xl font-semibold mb-4">
                {updateProduct ? "Update Product" : "Add New Product"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateProduct ? saveUpdate() : handleAddNewProduct();
                }}
                className="space-y-4"
              >
                <div className="flex flex-col">
                  <label className="font-medium">Product Name</label>
                  <input
                    type="text"
                    className="border rounded-md p-2"
                    value={
                      updateProduct
                        ? updateProduct.product_name
                        : newProduct.product_name
                    }
                    onChange={(e) =>
                      updateProduct
                        ? setUpdateProduct({
                            ...updateProduct,
                            product_name: e.target.value,
                          })
                        : setNewProduct({
                            ...newProduct,
                            product_name: e.target.value,
                          })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Brand</label>
                  <input
                    type="text"
                    className="border rounded-md p-2"
                    value={
                      updateProduct ? updateProduct.brand : newProduct.brand
                    }
                    onChange={(e) =>
                      updateProduct
                        ? setUpdateProduct({
                            ...updateProduct,
                            brand: e.target.value,
                          })
                        : setNewProduct({
                            ...newProduct,
                            brand: e.target.value,
                          })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Price</label>
                  <input
                    type="number"
                    className="border rounded-md p-2"
                    value={
                      updateProduct ? updateProduct.price : newProduct.price
                    }
                    onChange={(e) =>
                      updateProduct
                        ? setUpdateProduct({
                            ...updateProduct,
                            price: e.target.value,
                          })
                        : setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                          })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Stock</label>
                  <input
                    type="number"
                    className="border rounded-md p-2"
                    value={
                      updateProduct ? updateProduct.stock : newProduct.stock
                    }
                    onChange={(e) =>
                      updateProduct
                        ? setUpdateProduct({
                            ...updateProduct,
                            stock: e.target.value,
                          })
                        : setNewProduct({
                            ...newProduct,
                            stock: e.target.value,
                          })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Image URL</label>
                  <input
                    type="text"
                    className="border rounded-md p-2"
                    value={
                      updateProduct
                        ? updateProduct.imageurl
                        : newProduct.imageurl
                    }
                    onChange={(e) =>
                      updateProduct
                        ? setUpdateProduct({
                            ...updateProduct,
                            imageurl: e.target.value,
                          })
                        : setNewProduct({
                            ...newProduct,
                            imageurl: e.target.value,
                          })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  {updateProduct ? "Save Changes" : "Add Product"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
