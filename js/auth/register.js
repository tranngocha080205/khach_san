// Tab switching
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const switchToRegister = document.getElementById("switchToRegister");
const switchToLogin = document.getElementById("switchToLogin");

function showLogin() {
  loginTab.classList.add("text-primary", "border-primary");
  loginTab.classList.remove("text-gray-500", "border-transparent");
  loginTab.setAttribute("aria-pressed", "true");

  registerTab.classList.remove("text-primary", "border-primary");
  registerTab.classList.add("text-gray-500", "border-transparent");
  registerTab.setAttribute("aria-pressed", "false");

  loginForm.classList.remove("auth-form-hidden");
  loginForm.classList.add("auth-form-visible");

  registerForm.classList.remove("auth-form-visible");
  registerForm.classList.add("auth-form-hidden");
}

function showRegister() {
  registerTab.classList.add("text-primary", "border-primary");
  registerTab.classList.remove("text-gray-500", "border-transparent");
  registerTab.setAttribute("aria-pressed", "true");

  loginTab.classList.remove("text-primary", "border-primary");
  loginTab.classList.add("text-gray-500", "border-transparent");
  loginTab.setAttribute("aria-pressed", "false");

  registerForm.classList.remove("auth-form-hidden");
  registerForm.classList.add("auth-form-visible");

  loginForm.classList.remove("auth-form-visible");
  loginForm.classList.add("auth-form-hidden");
}

loginTab.addEventListener("click", showLogin);
registerTab.addEventListener("click", showRegister);
switchToRegister.addEventListener("click", showRegister);
switchToLogin.addEventListener("click", showLogin);

// Form validation and submission
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
}

function hideError(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.classList.add("hidden");
}

function hideAllErrors(formType) {
  if (formType === "login") {
    hideError("loginUsernameError");
    hideError("loginPasswordError");
  } else {
    hideError("registerUsernameError");
    hideError("registerEmailError");
    hideError("registerPasswordError");
    hideError("registerConfirmPasswordError");
  }
}

// Login form submission
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  hideAllErrors("login");

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;
  let isValid = true;

  if (username.length < 3) {
    showError("loginUsernameError", "Username must be at least 3 characters");
    isValid = false;
  }

  if (password.length < 6) {
    showError("loginPasswordError", "Password must be at least 6 characters");
    isValid = false;
  }

  if (isValid) {
    const button = document.getElementById("loginButton");
    const buttonText = document.getElementById("loginButtonText");
    const spinner = document.getElementById("loginSpinner");

    button.disabled = true;
    buttonText.textContent = "Logging in...";
    spinner.classList.remove("hidden");

    // Simulate API call
    setTimeout(() => {
      button.disabled = false;
      buttonText.textContent = "Login";
      spinner.classList.add("hidden");
      alert("Login successful! (Demo)");
    }, 1500);
  }
});

// Register form submission
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    hideAllErrors("register");

    const username = document.getElementById("registerUsername").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById(
      "registerConfirmPassword",
    ).value;
    let isValid = true;

    if (username.length < 3) {
      showError(
        "registerUsernameError",
        "Username must be at least 3 characters",
      );
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("registerEmailError", "Please enter a valid email address");
      isValid = false;
    }

    if (password.length < 6) {
      showError(
        "registerPasswordError",
        "Password must be at least 6 characters",
      );
      isValid = false;
    }

    if (password !== confirmPassword) {
      showError("registerConfirmPasswordError", "Passwords do not match");
      isValid = false;
    }

    if (isValid) {
      const button = document.getElementById("registerButton");
      const buttonText = document.getElementById("registerButtonText");
      const spinner = document.getElementById("registerSpinner");

      button.disabled = true;
      buttonText.textContent = "Creating...";
      spinner.classList.remove("hidden");

      // Simulate API call
      setTimeout(() => {
        button.disabled = false;
        buttonText.textContent = "Create Account";
        spinner.classList.add("hidden");
        if (isValid) {
          window.location.href = "../../Components/auth/register-success.html";
        }
      }, 1500);
    }
  });

// Real-time validation feedback
document.getElementById("loginUsername").addEventListener("blur", function () {
  if (this.value.trim().length > 0 && this.value.trim().length < 3) {
    showError("loginUsernameError", "Username must be at least 3 characters");
  } else {
    hideError("loginUsernameError");
  }
});

document
  .getElementById("registerUsername")
  .addEventListener("blur", function () {
    if (this.value.trim().length > 0 && this.value.trim().length < 3) {
      showError(
        "registerUsernameError",
        "Username must be at least 3 characters",
      );
    } else {
      hideError("registerUsernameError");
    }
  });

document.getElementById("registerEmail").addEventListener("blur", function () {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (this.value.trim().length > 0 && !emailRegex.test(this.value.trim())) {
    showError("registerEmailError", "Please enter a valid email address");
  } else {
    hideError("registerEmailError");
  }
});

document
  .getElementById("registerConfirmPassword")
  .addEventListener("blur", function () {
    const password = document.getElementById("registerPassword").value;
    if (this.value.length > 0 && this.value !== password) {
      showError("registerConfirmPasswordError", "Passwords do not match");
    } else {
      hideError("registerConfirmPasswordError");
    }
  });
