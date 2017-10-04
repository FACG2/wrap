var $ = $ || console.error('$ undefined');  //eslint-disable-line
var apiReq = apiReq || console.error('apiReq is undefined'); //eslint-disable-line

(function () {
  var linkHash = window.location.hash;
  var dashboardContent = document.getElementById('dashboardContent');

  loading(dashboardContent);
  render('/getDashboard', dashboardContent);
  /* Dashboard Tab */
  document.getElementById('dashboardButton').addEventListener('click', function (event) {
    activateTabe('dashboardButton');
    loading(dashboardContent);
    render('/getDashboard', dashboardContent);
  });
  /* Tasks Tab */
  if (linkHash === '#tasks') {
    activateTabe('tasksButton');
    loading(dashboardContent);
    render('/getUsersTasks', dashboardContent);
    /* tabels */
    if ($('#dataTable')) {
      $('#dataTable').DataTable();
    }
  }
  document.getElementById('tasksButton').addEventListener('click', function (event) {
    activateTabe('tasksButton');
    loading(dashboardContent);
    render('/getUsersTasks', dashboardContent);
    /* tabels */
    if ($('#dataTable')) {
      $('#dataTable').DataTable();
    }
  });
  /* CurrnetProjects Tab */
  if (linkHash === '#currentProjects') {
    activateTabe('currentProjectsButton');
    loading(dashboardContent);
    render('/currentProjects', dashboardContent);
  }
  document.getElementById('currentProjectsButton').addEventListener('click', function (event) {
    activateTabe('currentProjectsButton');
    loading(dashboardContent);
    render('/currentProjects', dashboardContent);
  });
  /* CurrnetProjects Tab */
  if (linkHash === '#finishedProjects') {
    activateTabe('finishedProjectsButton');
    loading(dashboardContent);
    render('/finishedProjects', dashboardContent);
  }
  document.getElementById('finishedProjectsButton').addEventListener('click', function (event) {
    activateTabe('finishedProjectsButton');
    loading(dashboardContent);
    render('/finishedProjects', dashboardContent);
  });

  /* Create New Project Tab */
  if (linkHash === '#createProject') {
    activateTabe('createProjectButton');
    loading(dashboardContent);
    renderCreateProjectForm(dashboardContent);
  }
  document.getElementById('createProjectButton').addEventListener('click', function (event) {
    activateTabe('createProjectButton');
    loading(dashboardContent);
    renderCreateProjectForm(dashboardContent);
  });
})();

function loading (container) {
  container.innerHTML = '<h2>Loading.....</h2>';
}
function activateTabe (tabId) {
  document.querySelector('.navbar-sidenav .active').classList.remove('active');
  document.getElementById(tabId).classList.add('active');
}

function render (url, container) {
  getData(url, function (err, data) {
    if (err) {
      container.innerHTML = '<h2>' + err.message + '</h2>';
    } else {
      container.innerHTML = data;
    }
  });
}

function getData (url, cb) {
  apiReq(url, 'GET', function (err, data) {
    if (err) {
      cb(new Error('Connection Error!'));
    } else {
      cb(null, data);
    }
  });
}

function renderCreateProjectForm (container) {
  container.innerHTML = '<h2 class="mb-3">Create New Project</h2>' +
                        '<form id="createProjectForm" action="/addProject" method="post">' +
                        '<div class="row">' +
                        '<div class="col-md-6 mb-3">' +
                            '<label for="validationDefault01">Project name</label>' +
                            '<input type="text" class="form-control" name="title" id="validationDefault01" placeholder="Project name" value="" required>' +
                            '</div>' +
                          '<div class="col-md-6 mb-3">' +
                            '<label for="validationDefault01">Project Description</label>' +
                            '<input type="text" class="form-control"  name="description" id="validationDefault01" placeholder="Project Description" value="">' +
                          '</div>' +
                        '</div>' +
                        '<div class="row">' +
                          '<div class="col-md-6 mb-3">' +
                            '<label for="validationDefault03">Working Days Per Week</label>' +
                            '<input type="number" name="wDays" min="0" value="0" class="form-control" id="validationDefault03" placeholder="No. of Days" required>' +
                          '</div>' +
                          '<div class="col-md-6 mb-3">' +
                            '<label for="validationDefault04">Working Hours Per Day</label>' +
                            '<input type="number" name="wHours" min="0" value="0" class="form-control" id="validationDefault04" placeholder="No. of Hours" required>' +
                          '</div>' +
                        '</div>' +
                        '<button class="btn btn-primary" name="submit" value="Create Project!" type="submit">Submit Project</button>' +
                      '</form>';
}
