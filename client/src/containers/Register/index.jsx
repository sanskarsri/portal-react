import React, { Component } from "react";

import { checkValidity } from "../../shared/validations";

import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import FormMarker from "../../components/FormMarker";


class Register extends Component {


  state = {
    registerForm: {
      fullName: {
        value: "",
        valid: false,
        focused: false,
        messageClassName: "none"
      },
      email: {
        value: "",
        valid: false,
        focused: false,
        messageClassName: "none"
      },
      phone: {
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
      confirmPassword: {
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

  handleAddGaps = (str, gapNo) => {
    let formattedText = str.split(" ").join("");
    if (formattedText.length > 0) {
      formattedText = formattedText
        .match(new RegExp(`.{1,${gapNo}}`, "g"))
        .join(" ");
    }

    if (str.length > 19) {
      return formattedText.substring(0, 19);
    } else {
      return formattedText;
    }
  };

  handleAddSlash = (str, gapNo) => {
    let formattedText = str.split("/").join("");
    if (formattedText.length > 0) {
      formattedText = formattedText
        .match(new RegExp(`.{1,${gapNo}}`, "g"))
        .join("/");
    }

    if (str.length > 5) {
      return formattedText.substring(0, 5);
    } else {
      return formattedText;
    }
  };

  handleSetMaxLen = (str, length) => {
    if (str.length > length) {
      return str.substring(0, length);
    } else {
      return str;
    }
  };

  

  handleOnRegister = async (e) => {
    e.preventDefault();

  const fname=this.state.registerForm.fullName.value;
  const email=this.state.registerForm.email.value;
  const phone=this.state.registerForm.phone.value;
  const password=this.state.registerForm.password.value;
  // console.log(fname);
  const res = await fetch("/data" , {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    } ,
    
    body: JSON.stringify({fname,email,phone,password})
  });

  const data = await res.json();

    this.props.history.push("/login");
  };

  render() {
    const registerForm = this.state.registerForm;

    return (
      <Layout>
        <div className="register">
          <div className="register__title">Register with us</div>
          <div className="register__header">
          <a href="/login">Login</a>
          </div>

          <div className="register__section">
            <div className="row">
              <div className="col-md-6">
                <form onSubmit={this.handleOnRegister}>
                  <Input
                    label="Full Name"
                    attributes={{
                      type: "text",
                      required: true,
                      theme: "default",
                      value: registerForm.fullName.value,
                      onChange: event =>
                        this.handleInputOnChange(event, "fullName", {
                          required: true,
                          isFullName: true
                        }),
                      onFocus: () =>
                        this.handleInputFocus("fullName", {
                          focused: true
                        }),
                      onBlur: () =>
                        this.handleInputFocus("fullName", {
                          focused: false
                        })
                    }}
                    hasError={!registerForm.fullName.valid}
                    focused={registerForm.fullName.focused}
                    message={
                      !registerForm.fullName.valid &&
                      !registerForm.fullName.focused &&
                      registerForm.fullName.value !== ""
                        ? "Your name must be at least 2 characters long and have a space!"
                        : ""
                    }
                    messageClassName={registerForm.fullName.messageClassName}
                  />

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
                    label="Phone Number"
                    attributes={{
                      type: "text",
                      placeholder: "e.g. 70322...45",
                      required: true,
                      theme: "default",
                      value: registerForm.phone.value,
                      onChange: event =>
                        this.handleInputOnChange(event, "phone", {
                          required: true,
                          isPhone: true
                        }),
                      onFocus: () =>
                        this.handleInputFocus("phone", {
                          focused: true
                        }),
                      onBlur: () =>
                        this.handleInputFocus("phone", {
                          focused: false
                        })
                    }}
                    hasError={!registerForm.phone.valid}
                    focused={registerForm.phone.focused}
                    message={
                      !registerForm.phone.valid &&
                      !registerForm.phone.focused &&
                      registerForm.phone.value !== ""
                        ? "Your phone number is required and must be valid!"
                        : ""
                    }
                    messageClassName={registerForm.phone.messageClassName}
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
                    message={
                      !registerForm.password.valid &&
                      !registerForm.password.focused &&
                      registerForm.password.value !== ""
                        ? `Your password is required and must contain at least one uppercase character,
                     one number, special character and not shorter than 6 characters!`
                        : `Your password is required and must contain at least one uppercase character,
                        one number, special character and not shorter than 6 characters`
                    }
                    messageClassName={registerForm.password.messageClassName}
                  />

                  <Input
                    label="Confirm Password"
                    attributes={{
                      ...this.state.registerForm.confirmPassword.attributes,
                      required: true,
                      theme: "default",
                      value: registerForm.confirmPassword.value,
                      onChange: event =>
                        this.handleInputOnChange(event, "confirmPassword", {
                          required: true,
                          isPassword: true
                        }),
                      onFocus: () =>
                        this.handleInputFocus("confirmPassword", {
                          focused: true
                        }),
                      onBlur: () =>
                        this.handleInputFocus("confirmPassword", {
                          focused: false
                        })
                    }}
                    hasError={!registerForm.confirmPassword.valid}
                    focused={registerForm.confirmPassword.focused}
                    appendItem="password"
                    isPasswordVisible={
                      registerForm.confirmPassword.isPasswordVisible
                    }
                    handleAppendItemClick={() =>
                      this.handlePasswordToggle("confirmPassword")
                    }
                    message={
                      (!registerForm.confirmPassword.valid &&
                        !registerForm.confirmPassword.focused &&
                        registerForm.confirmPassword.value !== "") ||
                      (registerForm.confirmPassword.value !==
                        registerForm.password.value &&
                        registerForm.confirmPassword.value !== "")
                        ? "Password must match the password field and be valid!"
                        : ""
                    }
                    messageClassName={
                      registerForm.confirmPassword.messageClassName
                    }
                  />


                  <div className="register__btn">
                    <Button
                      color="brand--alt"
                      disabled={!this.state.formIsValid}
                    >
                      Register
                    </Button>
                  </div>
                </form>
              </div>
              <div className="col-md-6 register__marker">
                <FormMarker
                  num={1}
                  text="Full Name"
                  value={registerForm.fullName.value}
                  valid={registerForm.fullName.valid}
                />
                <FormMarker
                  num={2}
                  text="Email Address"
                  value={registerForm.email.value}
                  valid={registerForm.email.valid}
                />
                <FormMarker
                  num={3}
                  text="Phone Number"
                  value={registerForm.phone.value}
                  valid={registerForm.phone.valid}
                />
                <FormMarker
                  num={4}
                  text="Password"
                  value={registerForm.password.value}
                  valid={registerForm.password.valid}
                />
                <FormMarker
                  num={5}
                  text="Confirm Password"
                  value={registerForm.confirmPassword.value}
                  valid={registerForm.fullName.valid}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Register;
