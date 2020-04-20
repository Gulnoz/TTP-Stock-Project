import React from "react";
import { ReactForm } from "../../components/form/form.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "./loginForm.css";
import { User, Key } from "react-feather";

class SignUpForm extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errorMessage: null
        };
        this.inputChangeHandler = e => {
            e.preventDefault();
            this.setState({ [e.target.id]: e.target.value });
        };
    }

    render() {
        const inputs = [
            {
                id: "email",
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
                class: "password",
                placeholder: "Enter password",
                type: "password",
                divClassName: "col-md-3",
                inputGroupAddon: "password-addon",
                inputIcon: <Key color="white" />,
                onChange: this.inputChangeHandler,
                required: "required",
                ariaLabel: "Password"
            },
            {
                class: "password",
                placeholder: "Repeat password",
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
                    <ReactForm signUpHendler={this.props.signUpHendler}errorMessage={this.props.errorMessage} handleSubmit={this.props.handleSubmit} state={this.state} inputs={inputs} submitButtonText={this.props.submitButtonText} />
                </div>
            </div>
        );
    }
}
export default SignUpForm;