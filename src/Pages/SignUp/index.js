import React, { Component } from "react";
import { Images } from "../../assets/images";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import '../../Stylesheet/common.scss'
import { loginPageText } from "../../Constant/loginConstant";
import Button from "../../Component/Button";
import Input from "../../Component/Input";
import { IdConstant } from "../../Constant/appConstant";
import withNavigation from "../../HOC/navigate";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      cpassword: "",
      messge: false,
      errorMessage: false,
    };

    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup(e) {
    e.preventDefault();
    const { email, password, cpassword } = this.state;
    const auth = getAuth();
    
    if (password !== cpassword) {
      this.setState({ errorMessage: true });
      return;
    }
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential?.user?.accessToken) {
          this.setState({ messge: true });
          setTimeout(() => {
            this.props.navigate('/login');
          }, 5000);
        }
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  }

  render() {
    const { email, password, cpassword, messge, errorMessage } = this.state;

    return (
      <div className="login flex justify-center items-center">
        <div className="login-container w-full lg:w-1/3 mx-4 lg:mx-0 flex justify-center items-center">
          <div className="login-wrap">
            <div className="login-form">
              {errorMessage && <div className="error">Something went wrong</div>}
              {messge && <div className="error">Sign up success</div>}
              <h2 className="pb-8 text-center">{loginPageText.SIGNUP}</h2>
              <div className="login-form-validate">
                <form onSubmit={this.handleSignup}>
                  <Input
                    value={email}
                    type="text"
                    onChange={(e) => this.setState({ email: e.target.value, errorMessage: false })}
                    placeholder="Enter Name"
                    name="email"
                  />
                  <Input
                    value={password}
                    type="password"
                    onChange={(e) => this.setState({ password: e.target.value, errorMessage: false })}
                    placeholder="Enter Password"
                    name="password"
                  />
                  <Input
                    value={cpassword}
                    type="password"
                    onChange={(e) => this.setState({ cpassword: e.target.value, errorMessage: false })}
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
                <div onClick={() => this.props.navigate("/login")} className="login-signup">
                  <a>{loginPageText.LOGIN} </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNavigation(SignUp);
