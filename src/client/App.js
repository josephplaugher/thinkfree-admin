import {Form, Input, Button} from 'reactform-appco'
import React from 'react'
import EB from 'Util/EB'
import SetUrl from 'Util/SetUrl'
import ValRules from 'Util/ValRules'
import Home from './mainmenu/home'
import 'css/main.css'

class AppreciateCo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoggedIn: false,
      userData: {},
      userNotify: ''
    }
    this.response = this.response.bind(this);
    this.logout = this.logout.bind(this);
  }

  response = (res) => {
    if(res.success === true) {
      this.setState({
        userNotify: res.userNotify,
        userData: res.userData,
        isLoggedIn: true
      });
    }else{
      this.setState({
        userNotify: "You are not authorized",
    });
    if (res.error !== 'undefined') {
      console.error('submit error: ', res.error);
    }
  }
}

logout = () => {
  this.setState({isLoggedIn: false})
}

  render() {

    return (
      <div id="container">
        <div>
          {this.state.isLoggedIn ? (
            <EB comp="Home">
              <Home userData={this.state.userData}
                activePost={this.state.activePost}
                logout={this.logout} />
            </EB>
          ) : (
              <div id="sign-in">
                <p id="login-msg">{this.state.userNotify}</p>               
                <Form formTitle="Sign In" 
                  action={`${SetUrl()}/adminLogin`} 
                  response={this.response} 
                  valrules={ValRules}>
                  <Input name="email" label="Email" /><br />
                  <Input name="password" label="Password" />
                  <div className="buttondiv">
                    <Button id="submit" value="Sign In" />
                  </div>
                </Form>
          
              </div>
            )}
        </div>
      </div>
    )
  }

}

export default AppreciateCo;