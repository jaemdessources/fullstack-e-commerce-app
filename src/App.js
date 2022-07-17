// eslint-disable-next-line
//import logo from "./logo.svg";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
//styles
import "./App.css";
import "./stylesheets/Products.css";
import "./stylesheets/authentication.css";
import "react-toastify/dist/ReactToastify.css";
//pages and components
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={5000} pauseOnFocusLoss={false} pauseOnHover={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route
            path="/cart"
            exact
            element={
              <ProtectedRoutes>
                <Cart />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/orders"
            exact
            element={
              <ProtectedRoutes>
                <Orders />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/product/:id"
            exact
            element={
              <ProtectedRoutes>
                <Product />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin"
            exact
            element={
              <ProtectedRoutes>
                <Admin />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
