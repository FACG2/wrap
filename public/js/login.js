(function () {
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var loginData = event.target;
      var loginReq = {
        email: loginData[0].value,
        password: loginData[1].value
      };
      apiReq('/login','POST', function (err, data) {// eslint-disable-line
        if (err) {
          document.getElementsByClassName('errNote')[0].textContent = 'Connection Error!';
        } else {
          if (data === '/ref') {
            window.location.reload();
          } else {
            document.getElementsByClassName('errNote')[0].textContent = data;
          }
        }
      }, JSON.stringify(loginReq));
    });
  }

  /* Sign up listener */
  var signupForm = document.getElementById('signupForm');
  var errorSignup = document.getElementsByClassName('errNote')[1];
  if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var signupData = event.target;
      var signupReq = {
        username: signupData[0].value,
        email: signupData[1].value,
        githubname: signupData[2].value,
        password: signupData[3].value,
        cpassword: signupData[4].value
      };
      if (signupReq.password !== signupReq.cpassword) {
        errorSignup.textContent = 'passwords are not matched';
      } else {
        apiReq('/signup','POST', function (err, data) {// eslint-disable-line
          if (err) {
            errorSignup.textContent = 'Connection Error!';
          } else {
            if (data === '/ref') {
              window.location.reload();
            } else {
              errorSignup.textContent = data;
            }
          }
        }, JSON.stringify(signupReq));
      }
    });
  }
}
)();
