import React, { useState } from "react";
import { Images } from "../../assets/images";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import '../../Stylesheet/common.scss'
import { loginPageText } from "../../Constant/loginConstant";
import Button from "../../Component/Button";
import Input from "../../Component/Input";
import { IdConstant } from "../../Constant/appConstant";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [messge, setMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const auth = getAuth();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      setErrorMessage(true)
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential?.user?.accessToken) {
          setMessage(true);
          setTimeout(() => {
            navigate('/login')
          }, 5000)
        }
      })
      .catch((error) => {
      });
  };

  return (
    <div className="login flex justify-center items-center">
      <div className="login-container w-full lg:w-1/3 mx-4 lg:mx-0 flex justify-center items-center">
        <div className="login-wrap">
          <div className="login-form">
            {errorMessage && <div className="error">Something went wrong</div>}
            {messge && <div className="error">Sign up success</div>}
            <h2 className="pb-8">{loginPageText.SIGNUP}</h2>
            <div className="login-form-validate">
              <form onSubmit={handleSignup}>
                <Input
                  value={email}
                  type="text"
                  onChange={(e) => {
                    setErrorMessage(false)
                    setEmail(e.target.value)
                  }}
                  placeholder="Enter Name"
                  name="email"
                />
                <Input
                  value={password}
                  type="password"
                  onChange={(e) => {
                    setErrorMessage(false)
                    setPassword(e.target.value)
                  }}
                  placeholder="Enter Password"
                  name="password"
                />
                <Input
                  value={cpassword}
                  type="password"
                  onChange={(e) => {
                    setErrorMessage(false)
                    setCPassword(e.target.value)
                  }}
                  placeholder="Confirm Password"
                  name="cpassword"
                />
                <Button label={IdConstant.SUBMIT} type="submit" />
                {
                  messge && <div className="success">
                    {IdConstant.SUCCESS}
                  </div>
                }
              </form>
              <div onClick={() => navigate("/login")} className="login-signup">
                <a>{loginPageText.LOGIN} </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
