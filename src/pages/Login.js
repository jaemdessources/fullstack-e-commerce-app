import React, { useState } from "react";

import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
//Auth
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const login = async () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        localStorage.setItem("currentUser", JSON.stringify(res));
        setLoading(false);
        toast.success("Logged in");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("failed");
      });
  };
  return (
    <div className="login-parent">
      {loading && <Loader />}
      <div className="register-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-4 z1">
          <div className="login-form">
            <h2>Login</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="my-3" onClick={login}>
              Login
            </button>
            <hr />
            <Link to="/register">Register here</Link>
          </div>
        </div>
        <div className="col-md-5 z1">
          <lottie-player
            src="https://assets4.lottiefiles.com/packages/lf20_5tkzkblw.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Login;
