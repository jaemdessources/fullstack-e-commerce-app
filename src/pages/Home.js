import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
//routing
import { useNavigate } from "react-router-dom";

//firebase
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
//redux
import { useDispatch, useSelector } from "react-redux";

function Home() {
  //state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
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

  function formatName(name) {
    return name.length > 75 ? name.substring(0, 75) + "..." : name;
  }
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="d-flex w-50 align-items-center justify-content-center my-3">
          <input
            type="text"
            name="search"
            className="form-control  mx-2"
            placeholder="search items"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
          />
          <select
            name="filter"
            className="form-control mt-3"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="mobiles">Mobiles</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>
        <div className="row">
          {products
            .filter((obj) => obj.name.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .map((product, i) => (
              <div className="col-md-4" key={i}>
                <div className="m-2 p-1 product position-relative">
                  <div className="product-content">
                    <p className="product-name">{formatName(product.name)}</p>
                    <div className="text-center">
                      <img src={product.imageURL} alt="product" className="product-img" />
                    </div>
                  </div>
                  <div className="product-actions">
                    <h2>${product.price}</h2>
                    <div className="d-flex">
                      <button className="mx-2" onClick={() => addToCart(product)}>
                        ADD TO CART
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/product/${product.id}`);
                        }}
                      >
                        VIEW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
