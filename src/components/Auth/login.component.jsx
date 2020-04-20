import React from "react";

import LoginForm from "../LoginForm/loginForm.component";
import SignUpForm from "../LoginForm/signUpForm.component";

class Login extends React.Component {
  
    state = {
      email: "",
      password: "",
      errorMessage: null,
      login: true,
    };
    signUpHendler = () => {
     this.setState({
       login: false,
     })
    }
    handleSubmit = (event, data) => {
      event.preventDefault();
      const { email, password } = data;
      fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password
        }),
        headers: { "content-type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          const { error } = data;
          if (error) {
            this.setState({
              errorMessage: error,
              email: email,
              password: password
            });
          } else {
            const { history } = this.props;
            const { user, jwt } = data;
            localStorage.setItem("currentUserToken", jwt);
            this.props.setUser(user.data);
            history.push("/");
          }
          //   users.push(data);
          //   this.setState({ users: users });
        })
        .catch();
    };
 
  render() {
    return (
    <>
        {this.state.login ?
          <LoginForm signUpHendler={this.signUpHendler} errorMessage={this.state.errorMessage} handleSubmit={this.handleSubmit} submitButtonText={"Log In"}/>
    : <SignUpForm signUpHendler={this.signUpHendler}/>
        }
   </>
    )
    
  }
}
export default Login;
