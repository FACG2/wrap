var Chart = Chart || console.error('Chart undefined');  //eslint-disable-line
var apiReq = apiReq || console.error('apiReq undefined');  //eslint-disable-line

(function () {
/* Login Charts */
  Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#292b2c';
// -- Area Chart Example
  var ctx = document.getElementById('myAreaChart');
  var myLineChart = new Chart(ctx, {//eslint-disable-line
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Sessions',
        lineTension: 0.3,
        backgroundColor: 'rgba(2,117,216,0.2)',
        borderColor: 'rgba(2,117,216,1)',
        pointRadius: 5,
        pointBackgroundColor: 'rgba(2,117,216,1)',
        pointBorderColor: 'rgba(255,255,255,0.8)',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(2,117,216,1)',
        pointHitRadius: 20,
        pointBorderWidth: 2,
        data: [20, 50, 10, 30, 40, 50, 90, 30, 30, 60, 70, 80]
      }]
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 100,
            maxTicksLimit: 5
          },
          gridLines: {
            color: 'rgba(0, 0, 0, .125)'
          }
        }]
      },
      legend: {
        display: false
      }
    }
  });

/* /Login charts */
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var loginData = event.target;
      var loginReq = {
        email: loginData[0].value,
        password: loginData[1].value
      };
      loginForm.classList.add('loading');
      apiReq('/login', 'POST', function (err, data) {
        if (err) {
          document.getElementsByClassName('errNote')[0].textContent = err.message;
        } else {
          if (data === '/ref') {
            window.location.reload();
          } else {
            loginForm.classList.remove('loading');
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
        loginForm.classList.add('loading');
        apiReq('/signup','POST', function (err, data) {// eslint-disable-line
          if (err) {
            errorSignup.textContent = err.message;
          } else {
            if (data === '/ref') {
              window.location.reload();
            } else {
              loginForm.classList.remove('loading');
              errorSignup.textContent = data;
            }
          }
        }, JSON.stringify(signupReq));
      }
    });
  }
}
)();
