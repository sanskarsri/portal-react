import React, { Component } from "react";

import { checkValidity } from "../shared/validations";

import Layout from "../components/Layout";
import Input from "../components/Input";
import Button from "../components/Button";


class Login extends Component {


  state = {
    registerForm: {
      email: {
        value: "",
        valid: false,
        focused: false,
        messageClassName: "none"
      },
      password: {
        attributes: {
          type: "password"
        },
        isPasswordVisible: false,
        value: "",
        valid: false,
        focused: false,
        messageClassName: "none"
      },

    },
    formIsValid: false
  };

  handleInputOnChange = (event, elementId, validations) => {
    const value = event.target.value;

    const updatedFormElement = {
      ...this.state.registerForm[elementId],
      value,
      valid: checkValidity(value, validations),
      messageClassName:
        !checkValidity(value, validations) && value !== ""
          ? "input__message--error"
          : "none"
    };

    const updatedForm = {
      ...this.state.registerForm,
      [elementId]: updatedFormElement
    };

    let formIsValid = true;
    for (let elementId in updatedForm) {
      formIsValid = updatedForm[elementId].valid && formIsValid;
    }

    this.setState({
      registerForm: updatedForm,
      formIsValid: formIsValid
    });
  };

  handleInputFocus = (name, updatedState) => {
    const updatedNameObject = {
      ...this.state.registerForm[name],
      ...updatedState
    };

    const updatedForm = {
      ...this.state.registerForm,
      [name]: updatedNameObject
    };

    this.setState({
      registerForm: updatedForm
    });
  };

  handlePasswordToggle = elementId => {
    const updatedAttribute = {
      ...this.state.registerForm[elementId].attributes,
      type:
        this.state.registerForm[elementId].attributes.type === "password"
          ? "text"
          : "password"
    };
    const updatedFormElement = {
      ...this.state.registerForm[elementId],
      attributes: updatedAttribute,
      isPasswordVisible: this.state.registerForm[elementId].isPasswordVisible
        ? false
        : true
    };

    const updatedForm = {
      ...this.state.registerForm,
      [elementId]: updatedFormElement
    };

    this.setState({
      registerForm: updatedForm
    });
  };

  

  handleOnRegister = async (e) => {
    e.preventDefault();

  const email=this.state.registerForm.email.value;
  const password=this.state.registerForm.password.value;

  const res = await fetch("/login" , {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    } ,
    
    body: JSON.stringify({email,password})
  });

  const data = await res.json();
      if(data.message==="Success")
    this.props.history.push("/dashboard");
    else
    alert("Enter correct gmail and password");
  };

  render() {
    const registerForm = this.state.registerForm;

    return (
      <Layout>
        <div className="register">
          <div className="register__title">Login</div>
          <div className="register__header">
            <a href="/register">Register</a>
          </div>

          <div className="register__section">
            <div className="row">
              <div className="col-md-6">
                <form onSubmit={this.handleOnRegister}>


                  <Input
                    label="Email Address"
                    attributes={{
                      type: "text",
                      required: true,
                      theme: "default",
                      value: registerForm.email.value,
                      onChange: event =>
                        this.handleInputOnChange(event, "email", {
                          required: true,
                          isEmail: true
                        }),
                      onFocus: () =>
                        this.handleInputFocus("email", {
                          focused: true
                        }),
                      onBlur: () =>
                        this.handleInputFocus("email", {
                          focused: false
                        })
                    }}
                    hasError={!registerForm.email.valid}
                    focused={registerForm.email.focused}
                    message={
                      !registerForm.email.valid &&
                      !registerForm.email.focused &&
                      registerForm.email.value !== ""
                        ? "Your email is required and must be valid!"
                        : ""
                    }
                    messageClassName={registerForm.email.messageClassName}
                  />


                  <Input
                    label="Password"
                    attributes={{
                      ...this.state.registerForm.password.attributes,
                      required: true,
                      theme: "default",
                      value: registerForm.password.value,
                      onChange: event =>
                        this.handleInputOnChange(event, "password", {
                          required: true,
                          isPassword: true
                        }),
                      onFocus: () =>
                        this.handleInputFocus("password", {
                          focused: true
                        }),
                      onBlur: () =>
                        this.handleInputFocus("password", {
                          focused: false
                        })
                    }}
                    hasError={!registerForm.password.valid}
                    focused={registerForm.password.focused}
                    appendItem="password"
                    isPasswordVisible={registerForm.password.isPasswordVisible}
                    handleAppendItemClick={() =>
                      this.handlePasswordToggle("password")
                    }
                    message={""}
                    messageClassName={registerForm.password.messageClassName}
                  />

                  
                  <div className="register__btn">
                    <Button
                      color="brand--alt"
                      disabled={!this.state.formIsValid}
                    >
                      Login
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Login;
