import React, { Component } from "react";
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
import withNavigation from "../../HOC/navigate";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      successMessage: false,
      errorMessage: false,
      loader: false,
    };
    this.auth = getAuth();
  }

  setEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  setPassword = (e) => {
    this.setState({ password: e.target.value });
  };

  signIn = (e) => {
    this.setState({ loader: true });
    e.preventDefault();
    const { email, password } = this.state;
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("accessToken", JSON.stringify(userCredential?.user?.accessToken));
        const token = localStorage.getItem("accessToken");
        if (token) {
          this.setState({ successMessage: true, loader: false });
          setTimeout(() => {
            this.props.navigate("/dashboard");
          }, 500);
        } else {
          this.setState({ successMessage: true, loader: false });
        }
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          this.setState({ errorMessage: true, loader: false });
          setTimeout(() => {
            this.setState({ errorMessage: false });
          }, 500);
        }
      });
  };

  render() {
    const { email, password, successMessage, errorMessage, loader } = this.state;
    return (
      <div className="login flex justify-center items-center">
        <div className="login-container w-full lg:w-1/3 mx-4 lg:mx-0 flex justify-center items-center">
          <div className="login-wrap">
            <div className="login-form">
              {successMessage && <div className="success">Success</div>}
              {errorMessage && <div className="error">Error</div>}
              <h2 className="pb-8 text-center">{loginPageText.WELCOME}</h2>
              <div className="login-form-validate">
                <form onSubmit={this.signIn}>
                  <Input
                    value={email}
                    type="text"
                    onChange={this.setEmail}
                    placeholder="Enter Name"
                    name="email"
                  />
                  <Input
                    value={password}
                    type="password"
                    onChange={this.setPassword}
                    placeholder="Enter Password"
                    name="password"
                  />
                  <Button
                    label={loader ? <Loader /> : IdConstant.SUBMIT}
                    type="submit"
                  />
                </form>
                <div onClick={() => this.props.navigate("/signup")} className="login-signup">
                  <a>{loginPageText.SIGNUP} </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNavigation(Login);
