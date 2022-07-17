import React, { useState, useEffect } from "react";
//components
import Layout from "../components/Layout";
import { FaTrash, FaEdit } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import AdminTab from "../components/AdminTab";
//routing
import { useNavigate } from "react-router-dom";

//firebase
import { collection, addDoc, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import fireDB from "../fireConfig";

function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    category: "",
  });
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setLoading(true);
    try {
      const products = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      products.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const obj = { id: doc.id, ...doc.data() };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }
  useEffect(() => {
    getOrders();
  }, []);
  async function getOrders() {
    setLoading(true);
    try {
      const orders = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      orders.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrders(ordersArray);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editProduct = (product) => {
    setProduct(product);
    setAdd(false);
    setShow(true);
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      setDoc(doc(fireDB, "products", product.id), product)
        .then(() => {
          handleClose();
          getProducts();
          toast.success("Success");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      setLoading(false);
      toast.error("Failed !");
    }
  };

  const addProduct = async () => {
    try {
      setLoading(true);
      addDoc(collection(fireDB, "products"), product)
        .then(() => {
          handleClose();
          getProducts();
          toast.success("Success");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed !");
          setLoading(false);
        });
    } catch (error) {
      toast.error("Failed !");
      setLoading(false);
    }
  };

  const deleteProduct = async (product) => {
    try {
      setLoading(true);
      deleteDoc(doc(fireDB, "products", product.id))
        .then(() => {
          getProducts();
          toast.success("success");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.failed("Failed !");
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.failed("Failed !");
    }
  };
  const addHandler = () => {
    setAdd(true);
    setProduct({});
    handleShow();
  };
  return (
    <Layout loading={loading}>
      <AdminTab>
        <div className="products">
          {" "}
          <div className="d-flex justify-content-between">
            <button onClick={addHandler}>Add Product</button>
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={i}>
                  <td>
                    <img
                      src={product.imageURL}
                      alt="product"
                      height="80"
                      width="80"
                      className="product-cart-img"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>
                    <FaTrash
                      style={{ cursor: "pointer", marginRight: "1rem" }}
                      onClick={() => deleteProduct(product)}
                    />
                    <FaEdit
                      style={{ cursor: "pointer" }}
                      onClick={() => editProduct(product)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add ? "Add new Product:" : "Please enter the new product info:"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <hr />
                <input
                  type="text"
                  className="form-control"
                  placeholder="name"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="image url"
                  value={product.imageURL}
                  onChange={(e) => setProduct({ ...product, imageURL: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="category"
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              {add ? (
                <button className="save" onClick={addProduct}>
                  Save
                </button>
              ) : (
                <button className="save" onClick={updateProduct}>
                  Save
                </button>
              )}
              <button className="close">Close</button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="orders">
          <div className="p2">
            {orders.map((order, i) => {
              return (
                <table className="table order" key={i}>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th className="th-lg">Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems.map((product, i) => (
                      <tr key={i}>
                        <td className="product-cart-img-td">
                          <img
                            src={product.imageURL}
                            alt="product"
                            height="80"
                            width="80"
                            className="product-cart-img"
                          />
                        </td>
                        <td className="product-cart-name-td">{product.name}</td>
                        <td className="product-cart-price-td">{product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            })}
          </div>
        </div>
      </AdminTab>
    </Layout>
  );
}

export default Admin;
