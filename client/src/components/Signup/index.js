// Include React
import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
// import Auth from './utils/Auth';
// import Nav from './children/Nav'

require("./Signup.css");

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      username: "",
      password: "",
      passwordRepeat: "",
      email: "",
      emailRepeat: "",
    };
  }

  handleUsernameValidation = (event) => {
    // username is passed in
    const usernameVal = this.refs.username.value,
      usernameForm = this.refs.usernameForm,
      usernameFeedback = this.refs.usernameFeedback;
    // username is updated in state
    this.setState({
      username: usernameVal,
    });

    // username is checked to see if it matches certain length. If not, the screen will indicate it as such.
    if (usernameVal.length < 6) {
      usernameForm.classList.remove("has-success");
      usernameForm.classList.add("has-error");
      usernameFeedback.textContent =
        "username must be at least 6 characters long";
    } else {
      usernameForm.classList.remove("has-error");

      usernameForm.classList.add("has-success");
      usernameFeedback.textContent = "Username valid!";
    }
  };

  handlePasswordValidation = (event) => {
    // password is passed in
    const passwordVal = this.refs.password.value;
    const passwordForm = this.refs.passwordForm;
    const passwordFeedback = this.refs.passwordFeedback;

    this.setState({
      password: passwordVal,
    });

    const passwordRegEx =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    if (!passwordRegEx.test(passwordVal)) {
      passwordForm.classList.remove("has-success");
      passwordForm.classList.add("has-error");
      passwordFeedback.textContent =
        "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and must be at least 8 characters long.";
    } else {
      passwordForm.classList.remove("has-error");

      passwordForm.classList.add("has-success");
      passwordFeedback.textContent = "Password set correctly!";
    }
  };

  handlePasswordRepeat = (event) => {
    const passwordVal = this.state.password;
    const passwordRepeat = this.refs.repeatPassword.value;
    const repeatPasswordForm = this.refs.repeatPasswordForm;
    const repeatPasswordFeedback = this.refs.repeatPasswordFeedback;

    this.setState({
      passwordRepeat: passwordRepeat,
    });

    if (passwordVal !== passwordRepeat) {
      repeatPasswordForm.classList.remove("has-success");

      repeatPasswordForm.classList.add("has-error");
      repeatPasswordFeedback.textContent = "Passwords Don't Match";
    } else {
      repeatPasswordForm.classList.remove("has-error");

      repeatPasswordForm.classList.add("has-success");
      repeatPasswordFeedback.textContent = "Passwords Match!";
    }
  };

  handleEmailValidation = (event) => {
    const emailVal = this.refs.email.value;
    const emailForm = this.refs.emailForm;
    const emailFeedback = this.refs.emailFeedback;
    const emailAdditionalFeedback = this.refs.emailAdditionalFeedback;
    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    this.setState({
      email: emailVal,
    });

    if (!emailRegEx.test(emailVal)) {
      emailForm.classList.remove("has-success");

      emailForm.classList.add("has-error");
      emailFeedback.textContent = "Invalid Email";
      emailAdditionalFeedback.textContent = "Ex: someone@example.com";
    } else {
      emailForm.classList.remove("has-error");

      emailForm.classList.add("has-success");
      emailFeedback.textContent = "Valid Email!";
      emailAdditionalFeedback.textContent = "";
    }
  };

  handleEmailRepeat = (event) => {
    const emailVal = this.refs.emailRepeat.value;
    const emailForm = this.refs.emailRepeatForm;
    const emailFeedback = this.refs.emailRepeatFeedback;
    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    this.setState({
      emailRepeat: emailVal,
    });

    if (!emailRegEx.test(emailVal)) {
      emailForm.classList.remove("has-success");

      emailForm.classList.add("has-error");
      emailFeedback.textContent = "Emails Don't Match";
    } else {
      emailForm.classList.remove("has-error");

      emailForm.classList.add("has-success");
      emailFeedback.textContent = "Emails Match!";
    }
  };

  signUpUser = (userData) => {
    axios
      .post("/api/users/signup", {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      })
      .then(
        function (data) {
          console.log("data stuff", data.data);
          if (data.duplicateUser) {
            // Replace with Modal
            alert("Sorry, that username has been taken");
          } else if (data.data.success) {
            console.log("yay!");
            this.props.authenticate();
            this.setState({
              redirectToReferrer: true,
            });
          }
        }.bind(this)
      )
      .catch(function (err) {
        console.log(err);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;

    let userData = {
      username: username,
      email: email,
      password: password,
    };

    if (!userData.username || !userData.email || !userData.password) {
      return alert("Please don't leave fields blank");
    }

    // If we have an email and password, run the signUpUser function
    this.signUpUser(userData);

    this.setState({
      value: "",
      username: "",
      password: "",
      passwordRepeat: "",
      email: "",
      emailRepeat: "",
      redirectToReferrer: false,
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        {/* <Nav
				authenticated={this.props.authenticated}
				authenticate={this.props.authenticate}
				deAuthenticate={this.props.deAuthenticate}
				logout={this.props.logout}
			/> */}
        <div id="registration-container" className="container-fluid">
          <section className="container">
            <div className="container-page">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="col-md-6">
                  <h3 className="dark-grey">Registration</h3>

                  <div
                    id="username-form"
                    ref="usernameForm"
                    className="form-group col-lg-12"
                  >
                    <label>Username</label>
                    <input
                      type=""
                      name=""
                      ref="username"
                      className="form-control"
                      id="username-input"
                      value={this.state.username}
                      onChange={this.handleUsernameValidation}
                    />
                    <small
                      id="username-feedback"
                      ref="usernameFeedback"
                      className=""
                    ></small>
                  </div>

                  <div
                    id="password-form"
                    className="form-group col-lg-12"
                    ref="passwordForm"
                  >
                    <label>Password</label>
                    <input
                      type="password"
                      name=""
                      ref="password"
                      className="form-control"
                      id="password-input"
                      value={this.state.password}
                      onChange={this.handlePasswordValidation}
                    />
                    <small
                      id="password-feedback"
                      ref="passwordFeedback"
                      className=""
                    ></small>
                  </div>

                  <div
                    id="repeat-password-form"
                    className="form-group col-lg-12"
                    ref="repeatPasswordForm"
                  >
                    <label>Repeat Password</label>
                    <input
                      type="password"
                      name=""
                      ref="repeatPassword"
                      className="form-control"
                      id="repeat-password-input"
                      value={this.state.passwordRepeat}
                      onChange={this.handlePasswordRepeat}
                    />
                    <small
                      id="repeat-password-feedback"
                      className=""
                      ref="repeatPasswordFeedback"
                    ></small>
                  </div>

                  <div
                    id="email-form"
                    className="form-group col-lg-12"
                    ref="emailForm"
                  >
                    <label>Email Address</label>
                    <input
                      type="email"
                      name=""
                      ref="email"
                      className="form-control"
                      id="email-input"
                      value={this.state.email}
                      onChange={this.handleEmailValidation}
                    />

                    <p id="email-feedback" className="" ref="emailFeedback"></p>
                    <small
                      id="email-additional-feedback"
                      ref="emailAdditionalFeedback"
                      className="form-text text-muted"
                    ></small>
                  </div>

                  <div
                    id="email-repeat-form"
                    className="form-group col-lg-12"
                    ref="emailRepeatForm"
                  >
                    <label>Repeat Email Address</label>
                    <input
                      type="email"
                      name=""
                      ref="emailRepeat"
                      className="form-control"
                      id="repeat-email-input"
                      value={this.state.emailRepeat}
                      onChange={this.handleEmailRepeat}
                    />
                    <small
                      id="email-repeat-feedback"
                      className=""
                      ref="emailRepeatFeedback"
                    ></small>
                  </div>

                  <div className="col-sm-6">
                    <input type="checkbox" className="checkbox" />
                    Sigh up for our newsletter
                  </div>

                  <div className="col-sm-6">
                    <input type="checkbox" className="checkbox" />
                    Send notifications to this email
                  </div>
                </div>

                <div className="col-md-6">
                  <div>
                    <h2>Terms and Agreement</h2>
                    <p>
                      Welcome to [Your Personal Portfolio Website]! By signing
                      up and accessing the services provided by this website,
                      you agree to be bound by the following terms and
                      conditions:
                    </p>
                    <ol>
                      <li>
                        <strong>Acceptance of Terms:</strong> By using this
                        website and its services, you acknowledge that you have
                        read, understood, and agree to abide by all terms and
                        conditions outlined in this agreement.
                      </li>
                      <li>
                        <strong>User Account:</strong> You must create an
                        account to access certain features of the website. You
                        are responsible for maintaining the confidentiality of
                        your account credentials and for all activities that
                        occur under your account.
                      </li>
                      <li>
                        <strong>Accuracy of Information:</strong> You agree to
                        provide accurate, current, and complete information
                        during the registration process and to update such
                        information to keep it accurate, current, and complete.
                      </li>
                      <li>
                        <strong>Content Ownership:</strong> You retain ownership
                        of any content you upload, post, or otherwise make
                        available on the website. However, by submitting
                        content, you grant [Your Name or Website Name] a
                        worldwide, non-exclusive, royalty-free license to use,
                        reproduce, modify, adapt, publish, translate,
                        distribute, and display such content.
                      </li>
                      <li>
                        <strong>Prohibited Activities:</strong> You agree not to
                        engage in any of the following activities:
                        <ul>
                          <li>
                            - Violating any applicable laws or regulations.
                          </li>
                          <li>
                            - Infringing upon the rights of others, including
                            intellectual property rights.
                          </li>
                          <li>
                            - Uploading or transmitting viruses or any other
                            malicious code.
                          </li>
                          <li>
                            - Engaging in any activity that disrupts, interferes
                            with, or inhibits any other user's use and enjoyment
                            of the website.
                          </li>
                          <li>
                            - Attempting to gain unauthorized access to any
                            portion or feature of the website.
                          </li>
                        </ul>
                      </li>
                      <li>
                        <strong>Privacy Policy:</strong> Your use of this
                        website is also governed by our Privacy Policy, which
                        can be found [link to privacy policy]. By using this
                        website, you consent to the collection and use of your
                        information as described in the Privacy Policy.
                      </li>
                      <li>
                        <strong>Limitation of Liability:</strong> [Your Name or
                        Website Name] shall not be liable for any indirect,
                        incidental, special, consequential, or punitive damages
                        arising out of or relating to your use of the website,
                        including but not limited to loss of data, loss of
                        profits, or any other economic advantage.
                      </li>
                      <li>
                        <strong>Indemnification:</strong> You agree to indemnify
                        and hold harmless [Your Name or Website Name] and its
                        affiliates, officers, directors, employees, agents, and
                        licensors from and against any and all claims,
                        liabilities, damages, losses, costs, expenses, or fees
                        (including reasonable attorneys' fees) arising from your
                        use of the website or any violation of these terms and
                        conditions.
                      </li>
                      <li>
                        <strong>Modification of Terms:</strong> [Your Name or
                        Website Name] reserves the right to modify or revise
                        these terms and conditions at any time without prior
                        notice. Your continued use of the website following the
                        posting of any changes constitutes acceptance of those
                        changes.
                      </li>
                      <li>
                        <strong>Governing Law:</strong> This agreement shall be
                        governed by and construed in accordance with the laws of
                        [Your Country], without regard to its conflict of law
                        principles.
                      </li>
                    </ol>
                    <p>
                      By signing up for an account on [Your Personal Portfolio
                      Website], you acknowledge that you have read, understood,
                      and agree to be bound by these terms and conditions.
                    </p>
                    <p>
                      If you have any questions or concerns regarding these
                      terms and conditions, please contact us at [Your Contact
                      Information].
                    </p>
                  </div>

                  <button type="submit" className="btn btn-primary signup">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
