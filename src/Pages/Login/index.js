import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Images } from "../../assets/images";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import "../../Stylesheet/common.scss";
import { auth } from "../../firebase";
import Input from "../../Component/Input";
import Button from "../../Component/Button";
import { loginPageText } from "../../Constant/loginConstant";
import Loader from "../../Component/Loader";
import { IdConstant } from "../../Constant/appConstant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loader, setLoader] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const signIn = (e) => {
    setLoader(true)
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("accessToken", JSON.stringify(userCredential?.user?.accessToken));
        const token = localStorage.getItem("accessToken")
        if (token) {
          setSuccessMessage(true);
          setLoader(false)
          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
        } else{
          setLoader(false);
          setSuccessMessage(true);
        }
      })
      .catch((error) => {
        if(error.code === "auth/invalid-credential"){
          setErrorMessage(true)
          setLoader(false);
          setTimeout(() => {
            setErrorMessage(false)
          }, 500);
        }
      });
  };

  return (
    <div className="login flex justify-center items-center">
      <div className="login-container w-full lg:w-1/3 mx-4 lg:mx-0 flex justify-center items-center">
        <div className="login-wrap">
          <div className="login-form">
            {successMessage && <div className="success">Success</div>}
            {errorMessage && <div className="error">Error</div>}
            <h2 className="pb-8">{loginPageText.WELCOME}</h2>
            <div className="login-form-validate">
              <form onSubmit={signIn}>
                <Input
                  value={email}
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Name"
                  name="email"
                />
                <Input
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  name="password"
                />
                <Button
                  label={loader ? <Loader /> : IdConstant.SUBMIT}
                  type="submit"
                />
              </form>
              <div onClick={() => navigate("/signup")} className="login-signup">
                <a>{loginPageText.SIGNUP} </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
