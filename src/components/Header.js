import React from "react";
//components
import { Link } from "react-router-dom";
import { FaBars, FaCartPlus, FaUser } from "react-icons/fa";
//reduxc
import { useSelector } from "react-redux";
function Header() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { user } = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          FireCommerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars className="navbar-toggler-icon" size={25} color="white" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                <FaUser style={{ verticalAlign: "baseline", marginRight: ".25rem" }} />
                {user.email.substring(0, user.email.length - 10)}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">
                orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={logout}>
                logout
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FaCartPlus /> {cartItems.length}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
