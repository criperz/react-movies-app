import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import Select from "./select";
import CheckBox from "./checkbox";

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    // Joi finished when it finds an error -> abortEarly -> false
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    error.details.map(item => (errors[item.path[0]] = item.message));
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    // Check for errors
    const errors = this.validate();
    this.setState({ errors: errors || {} }); // Errors should always be object
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleCheckBox = ({ currentTarget: checkbox }) => {
    const data = { ...this.state.data };
    data[checkbox.name] = checkbox.checked;
    this.setState({ data });
  };

  renderButton = label => {
    return (
      <button disabled={this.validate()} className="btn btn-primary btn-block">
        {label}
      </button>
    );
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        type={type}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        label={label}
        name={name}
        value={data[name]}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderCheckBox(name, label) {
    const { data } = this.state;

    return (
      <CheckBox
        name={name}
        checked={data[name]}
        label={label}
        onChange={this.handleCheckBox}
      />
    );
  }
}

export default Form;
