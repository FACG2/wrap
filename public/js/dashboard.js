(function () {
  var linkHash = window.location.hash;
  var dashboardContent = document.getElementById('dashboardContent');
  /* Tasks Tab */
  if (linkHash === '#tasks') {
    loading(dashboardContent);
    renderTasks(dashboardContent);
  }
  document.getElementById('tasksButton').addEventListener('click', function (event) {
    loading(dashboardContent);
    renderTasks(dashboardContent);
  });

  /* Create New Project Tab */
  if (linkHash === '#createProject') {
    loading(dashboardContent);
    renderCreateProjectForm(dashboardContent);
  }
  document.getElementById('createProjectButton').addEventListener('click', function (event) {
    loading(dashboardContent);
    renderCreateProjectForm(dashboardContent);
  });
})();

function loading (container) {
  container.innerHTML = '<h2>Loading.....</h2>';
}

function renderTasks (container) {
  getTasks(function (err, data) {
    if (err) {
      container.innerHTML = '<h2>' + err + '</h2>';
    } else {
      console.log('Tasks request : ', data);
      data = JSON.parse(data);
      if (data.length === 0) {
        container.innerHTML = '<h2>No tasks assigned to you for now!<h2>';
      } else {
        container.innerHTML = data.reduce(function (acc, task) {
          acc += '<p>task id : ' + task.id + '</p>';
          return acc;
        }, '');
      }
    }
  });
}

function getTasks (cb) {
  apiReq('/getUsersTasks','GET', function (err, data) {// eslint-disable-line
    if (err) {
      cb('Connection Error!');
    } else {
      cb(null, data);
    }
  });
}

function renderCreateProjectForm (container) {
  container.innerHTML = '<h1>Create project</h1>' +
                        '<form id="createProjectForm" action="/addProject" method="post">' +
                          '<label>Title : <input type="text" name="title" value="" placeholder="Enter Project name.." required></label>' +
                          '<label>description : <input type="text" name="description" value="..." placeholder="Enter Project description.."></label>' +
                          '<label>Working days in a week : <input type="number" name="wDays" value="-1" placeholder="Enter Project name.."></label>' +
                          '<label>Working hours in a day : <input type="number" name="wHours" value="-1" placeholder="Enter Project name.."></label>' +
                          '<input type="submit" name="submit" value="Create Project!">' +
                        '</form>';
}
