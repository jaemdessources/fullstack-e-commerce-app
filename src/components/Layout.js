import React from "react";

//componenents
import Header from "./Header";
import Footer from "./Footer";
//styles
import "../stylesheets/Layout.css";
import Loader from "./Loader";
function Layout(props) {
  return (
    <div>
      {props.loading && <Loader />}
      <Header />
      <div className="content">{props.children}</div>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
