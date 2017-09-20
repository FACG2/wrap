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
})();
