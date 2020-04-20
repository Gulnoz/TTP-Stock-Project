import React from "react";
import { ReactForm } from "../../components/form/form.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "./loginForm.css";
import { User, Key } from "react-feather";
import { Button } from "react-bootstrap";

class LoginForm extends React.Component {
  
   state = {
      email: "",
      password: "",
      errorMessage: null
    };
    inputChangeHandler = e => {
      e.preventDefault();
      this.setState({ [e.target.name]: e.target.value });
    };
  clearFormHendler=()=>{
    // this.setState( {
    //   email: "",
    //   password: "",
    //   errorMessage: null
    // });
  }

  render() {
    const inputs = [
      {
        name: "email",
        placeholder: "Enter email",
        type: "email",
        divClassName: "col-md-3",
        inputGroupAddon: "loginInput-addon",
        inputIcon: <User color="white" />,
        onChange: this.inputChangeHandler,
        required: "required",
        ariaLabel: "Email"
      },
      {
        name: "password",
        placeholder: "Enter password",
        type: "password",
        divClassName: "col-md-3",
        inputGroupAddon: "password-addon",
        inputIcon: <Key color="white" />,
        onChange: this.inputChangeHandler,
        required: "required",
        ariaLabel: "Password"
      }
    ];
    return (
      <div className="container loginForm">
        <div className="Absolute-Center is-Responsive">
          <ReactForm 
            clearFormHendler={this.clearFormHendler}
          errorMessage={this.props.errorMessage} 
          handleSubmit={this.props.handleSubmit} 
          state={this.state} inputs={inputs} 
          submitButtonText={this.props.submitButtonText}/>
          
          <Button type="submit" style={{ float: "right" }} variant="dark"
           onClick={this.props.signUpShow}>
            Sign Up
          </Button>
        </div>
        <div>
       
      </div>
      </div>
    );
  }
}
export default LoginForm;
