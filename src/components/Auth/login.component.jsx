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
    signUpShow = () => {
     this.setState({
       login: false,
     })
    }
    handleSubmit = (event, data) => {
      event.preventDefault();
      const { email, password } = data;
      console.log(data)
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
  hendleSignUp = (event, data)=>{
      event.preventDefault();
    const { name, email, password, password2 } = data;
      if(password===password2){
    
    fetch('http://localhost:3000/users',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        })
        .then(res => res.json())
      .then((data) => {
        const { history } = this.props;
        const { user, jwt } = data;
        localStorage.setItem("currentUserToken", jwt);
        this.props.setUser(user.data);
        history.push("/");})
      } else{
        this.setState({
          errorMessage: 'Password must match!',
        })
        
      }

    }
    clearForm=()=>{

    }
    cencelHendler=()=>{
      this.setState({
        login: true,
      })
    }
  render() {
    return (
    <>
        {this.state.login ?
          <LoginForm 
            signUpShow={this.signUpShow}
           errorMessage={this.state.errorMessage}
            handleSubmit={this.handleSubmit} 
            submitButtonText={"Log In"}/>
          : <SignUpForm cencelHendler={this.cencelHendler}
          errorMessage={this.state.errorMessage}
            handleSubmit={this.hendleSignUp}
            submitButtonText={"Sign Up"}/>
        }
   </>
    )
    
  }
}
export default Login;
