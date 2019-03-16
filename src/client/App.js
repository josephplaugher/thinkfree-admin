import { FormClass, Input, Button } from "reactform-appco";
import React from "react";
import EB from "Util/EB";
import SetUrl from "Util/SetUrl";
import ValRules from "Util/ValRules";
import Home from "./mainmenu/home";
import "css/main.css";
import "css/form.css";

class App extends FormClass {
  constructor(props) {
    super(props);
    this.useLiveSearch = false;
    this.route = "/adminLogin";
    this.valRules = ValRules;
    this.state = {
      error: null,
      isLoggedIn: false,
      userData: {},
      email: "",
      password: "",
      formData: {
        email: "",
        password: ""
      },
      userNotify: {
        success: "",
        email: "",
        password: "",
        message: ""
      }
    };
    this.response = this.response.bind(this);
    this.logout = this.logout.bind(this);
  }

  response = res => {
    console.log("res: ", res);
    if (res.data.success === true) {
      this.setState({
        userNotify: res.data.userNotify,
        userData: res.data.userData,
        isLoggedIn: true
      });
    } else {
      this.setState({
        userNotify: res.data.userNotify
      });
      if (typeof res.error !== "undefined") {
        console.error("submit error: ", res.error);
      }
    }
  };

  logout = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    return (
      <div id="container">
        {this.state.isLoggedIn ? (
          <EB comp="Home">
            <Home
              userData={this.state.userData}
              activePost={this.state.activePost}
              logout={this.logout}
            />
          </EB>
        ) : (
          <div id="sign-in">
            {/* prettier-ignore*/}
            <p>Blog Admin Utility</p>
            <form onSubmit={this.rfa_onSubmit}>
              <Input
                name="email"
                label="Email"
                value={this.state.email}
                error={this.state.userNotify.email}
                onChange={this.rfa_onChange}
              />
              <Input
                name="password"
                label="Password"
                value={this.state.password}
                error={this.state.userNotify.password}
                onChange={this.rfa_onChange}
              />
              <div className="buttondiv">
                <Button id="submit" value="Sign In" />
              </div>
            </form>
            <p id="login-msg">{this.state.userNotify.message}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
