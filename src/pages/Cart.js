import React, { useEffect, useState } from "react";
//components
import Layout from "../components/Layout";
import Modal from "react-bootstrap/Modal";
import { FaTrash } from "react-icons/fa";
// import Button from "react-bootstrap/Button";
//firebase
import { addDoc, collection } from "firebase/firestore";
import fireDB from "../fireConfig";
//redux
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

function Cart() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + Number(cartItem.price);
    });
    setTotalAmount(temp);
  }, [cartItems]);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  const placeOrder = async () => {
    const person = {
      name,
      address,
      phoneNumber,
    };

    const orderInfo = {
      cartItems,
      person,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };
    setLoading(true);
    addDoc(collection(fireDB, "orders"), orderInfo)
      .then(() => {
        dispatch({ type: "EMPTY_CART" });

        toast.success("Order placed");
        setLoading(false);
        handleClose();
      })
      .catch(() => {
        toast.error("failed");
        setLoading(false);
      });
    console.log(cartItems);
  };
  return (
    <Layout loading={loading}>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((product, i) => (
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
              <td>{product.price}</td>
              <td>
                <FaTrash
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteFromCart(product)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <h3 className="total-amount">Total Amount = ${totalAmount}</h3>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button onClick={handleShow}>PLACE ORDER</button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please enter your adress:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="register-form">
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className="form-control"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="phone"
              className="form-control"
              placeholder="phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={placeOrder}>Order</button>
          <button onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default Cart;
