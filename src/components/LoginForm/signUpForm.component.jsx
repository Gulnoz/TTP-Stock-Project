import React from "react";
import { ReactForm } from "../../components/form/form.component";
import { Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./loginForm.css";
import { User, Key } from "react-feather";

class SignUpForm extends React.Component {
 
        state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errorMessage: null
        };
       inputChangeHandler = e => {
            e.preventDefault();
            this.setState({ [e.target.name]: e.target.value
            });
           
        };
    

    render() {
        const inputs = [
            {
                name: "name",
                placeholder: "Enter name",
                type: "text",
                value: this.state.name,
                divClassName: "col-md-3",
                inputGroupAddon: "loginInput-addon",
                inputIcon: <User color="white" />,
                onChange: this.inputChangeHandler,
                required: "required",
                ariaLabel: "Name"
            },{
                name: "email",
                placeholder: "Enter email",
                type: "email",
                value: this.state.email,
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
                value: this.state.password,
                divClassName: "col-md-3",
                inputGroupAddon: "password-addon",
                inputIcon: <Key color="white" />,
                onChange: this.inputChangeHandler,
                required: "required",
                ariaLabel: "Password"
            },
            {
                name: "password2",
                placeholder: "Repeat password",
                type: "password",
                value: this.state.password2,
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
                     errorMessage={this.state.errorMessage} 
                     handleSubmit={this.props.handleSubmit}
                     state={this.state} inputs={inputs} 
                     submitButtonText={this.props.submitButtonText} />
                    <Button type="submit" style={{ float: "right" }} variant="dark" onClick={this.props.cencelHendler}>
                        Cancel
                    </Button>
                </div>
               
            </div>
        );
    }
}
export default SignUpForm;