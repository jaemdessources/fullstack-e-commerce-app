import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
//firebase
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem("currentUser")).user.uid;
  const url = "https://m.media-amazon.com/images/I/61LudfCrrYL._AC_SX522_.jpg";

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
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
  return (
    <Layout loading={loading}>
      <div className="p2">
        {orders
          .filter((obj) => obj.userid === userId)
          .map((order, i) => {
            return (
              <table className="table order" key={i}>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
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
    </Layout>
  );
}

export default Orders;
