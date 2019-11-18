import { graphql, validateInputs, getAuthenticatedUser } from "./util";
import loginIcon from "../../_includes/partials/icons/login.svg";
import logoutIcon from "../../_includes/partials/icons/logout.svg";

const SIGN_UP = `
mutation CreateUser ($name: String!, $email: String!, $password: String!) {
  createUser(data: {name: $name, email: $email, password: $password}) {
    id
  }
}`;

const LOGIN = `
mutation Login ($email: String!, $password: String!) {
  authenticateUserWithPassword(email: $email, password: $password) {
    token
  }
}`;

const login = event => {
  event.preventDefault();
  const form = event.target;
  const { email, password } = form.elements;
  if (validateInputs([email, password])) {
    graphql(LOGIN, {
      email: email.value,
      password: password.value
    })
      .then(({ errors }) => {
        if (errors && errors.length) {
          console.log(errors);
          alert("Email or Password is incorrect.");
        } else {
          window.location = "/";
        }
      })
      .catch(e => {
        console.log(e);
        alert("Error during login");
      });
  } else {
    alert("Email and Password required.");
  }
};

/// Login form
const loginTarget = window.document.querySelector(`#keystone-login`);

if (loginTarget) {
  const form = document.createElement("form");
  form.innerHTML = `
    <div class="l-stack">
      <div class="l-form-row">
        <label>Email</label>
        <input type="text" name="email" class="input" />
      </div>
      <div class="l-form-row">
        <label>Password</label>
        <input type="password" name="password" class="input" />
      </div>
      <div class="l-form-row">
        <div class="l-login-button">
          <button type="submit" class="button">
            Login
          </button> <span>New User? <a href="/sign-up">Sign up</a></span>
        </div>
      </div>
    </div>
      `;
  form.classList.add("js-login-form");
  form.addEventListener("submit", login);
  loginTarget.appendChild(form);
}

// Signup form
const onSignUp = event => {
  event.preventDefault();
  const form = event.target;

  const {
    name,
    email,
    password,
    ["password-repeat"]: repeatPassword
  } = form.elements;

  if (validateInputs([name, email, password, repeatPassword])) {
    if (password.value === repeatPassword.value) {
      graphql(SIGN_UP, {
        name: name.value,
        email: email.value,
        password: password.value
      })
        .then(() => {
          graphql(LOGIN, {
            email: email.value,
            password: password.value
          })
            .then(({ errors }) => {
              if (errors && errors.length) {
                console.log(errors);
                alert("Error during login");
              } else {
                window.location = "/";
              }
            })
            .catch(e => {
              console.log(e);
              alert("Error during login");
            });
        })
        .catch(e => {
          console.log(e);
          alert("Error creating new user");
        });
    } else {
      alert("Passwords must match.");
    }
  } else {
    alert("All fields are required.");
  }
};

const signupFormTarget = window.document.querySelector(`#keystone-sign-up`);
if (signupFormTarget) {
  const form = document.createElement("form");
  form.innerHTML = `
    <div class="l-stack">
    <div class="l-form-row">
      <label>Name</label>
      <input type="text" name="name" class="input" />
    </div>
    <div class="l-form-row">
      <label>Email</label>
      <input type="text" name="email" class="input" />
    </div>
      <div class="l-form-row">
        <label>Password <small>(must be at least 8 characters)</small></label>
        <input type="password"  autocomplete="new-password"  name="password" class="input" />
      </div>
      <div class="l-form-row">
        <label>Repeat Password</label>
        <input type="password" name="password-repeat" class="input" />
      </div>
      <div class="l-form-row">
        <button type="submit" class="button">
          Sign-up
        </button>
      </div>
    </div>
      `;
  form.classList.add("js-sign-up-form");
  form.addEventListener("submit", onSignUp);
  signupFormTarget.appendChild(form);
}

// Login nav form
const LOGOUT = `mutation {
  unauthenticateUser {
    success
  }
}`;

const createLogoutEvent = authenticatedUser => event => {
  if (authenticatedUser) {
    event.preventDefault();
    graphql(LOGOUT).then(({ data: { unauthenticateUser } }) => {
      if (unauthenticateUser.success) {
        window.location = "/";
      }
    });
  }
};

const loginUI = document.getElementById("keystone-nav-login");
if (loginUI) {
  getAuthenticatedUser()
    .then(authenticatedUser => {
      if (authenticatedUser === null) return;

      if (authenticatedUser === false) {
        loginUI.innerHTML = "";
      } else {
        createLogoutEvent(authenticatedUser);
        loginUI.addEventListener("click", createLogoutEvent(authenticatedUser));
        loginUI.innerHTML = `Logout ${logoutIcon}`;
      }
    })
    .catch(e => {
      console.log(e);
    });
}
