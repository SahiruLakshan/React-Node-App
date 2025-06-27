// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");


  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products/");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission for adding or updating products
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await axios.put(`http://localhost:3000/api/products/update/${editingId}`,
          {
            ...form,
            price: Number(form.price),
            quantity: Number(form.quantity),
          }
        );
        setMessage(res.data.message);
      } else {
        const res = await axios.post("http://localhost:3000/api/products/create", {
          ...form,
          price: Number(form.price),
          quantity: Number(form.quantity),
        });
        setMessage(res.data.message);
      }
      setForm({ name: "", price: "", quantity: "" });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.error || "Error saving product");
    }
  };


  // Handle editing a product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
    setEditingId(product._id);
  };


  // Handle deleting a product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await axios.delete(`http://localhost:3000/api/products/delete/${id}`);
        setMessage(res.data.message);
        fetchProducts();
      } catch (err) {
        setMessage(err.response?.data?.error || "Error deleting product");
      }
    }
  };

  return (
    <div className="container my-4">
      <div className="card p-4">
        <h2 className="mb-3">Product Management</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="form-control"
              placeholder="Price"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="form-control"
              placeholder="Quantity"
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </form>

        <table className="table table-bordered table-striped mt-4">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id}>
                <td>{prod.name}</td>
                <td>Rs. {prod.price}</td>
                <td>{prod.quantity}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(prod)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(prod._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductPage;
