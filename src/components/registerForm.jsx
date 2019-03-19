import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";
import { loginWithJwt } from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
      isAdmin: false
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name"),
    isAdmin: Joi.boolean().label("Is Administrator?")
  };

  doSubmit = async () => {
    try {
      // Call the server
      const { headers } = await register(this.state.data);
      loginWithJwt(headers["x-auth-token"]);
      // Redirect the user to different page
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-lg-4 offset-lg-4">
          <h1 className="text-center">Register</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}
            {this.renderCheckBox("isAdmin", "is Administrator?")}
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
