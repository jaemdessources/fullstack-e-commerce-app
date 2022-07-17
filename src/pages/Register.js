import React, { useState } from "react";
//componenets
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
//Auth
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const register = async () => {
    setLoading(true);
    if (cpassword === password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setEmail("");
          setPassword("");
          setCpassword("");
          setLoading(false);
          toast.success("Registered");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/weak-password":
              toast.error("Password too weak");
              break;
            default:
              toast.error("failed");
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
      toast.error("Passwords are not equal");
    }
  };
  return (
    <div className="register-parent ">
      {loading && <Loader />}
      <div className="register-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <lottie-player
            src="https://assets4.lottiefiles.com/packages/lf20_5tkzkblw.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4 z1">
          <div className="register-form">
            <h2>Register</h2>
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
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
            <button className="my-3" onClick={register}>
              REGISTER
            </button>
            <hr />
            <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
