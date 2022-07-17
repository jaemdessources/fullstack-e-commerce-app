import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
//firebase
import { doc, getDoc } from "firebase/firestore";
import fireDB from "../fireConfig";
//redux
import { useDispatch } from "react-redux/es/exports";
//routing
import { useParams } from "react-router-dom";

function Product() {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      setLoading(true);
      console.log(params.id);
      const productTemp = await getDoc(doc(fireDB, "products", params.id));
      setProduct(productTemp.data());
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout loading={loading}>
      <h1>Product</h1>
      <div className="container mb-3">
        {product && (
          <div>
            <b>
              <p>{product.name}</p>
              <h4>{"$" + product.price}</h4>
              <img
                src={product.imageURL}
                alt="productImage"
                className="product-info-img"
              />
              <hr />
              <p>{product.description}</p>
              <div className="d-flex justify-content-en mt-3">
                <button onClick={() => addToCart(product)}>ADD TO CART</button>
              </div>
            </b>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Product;
