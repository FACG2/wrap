(function () {
/* Tabs */
  var linkHash = window.location.hash;
  var projectContent = document.getElementsByClassName('content-wrapper')[0];
  if (linkHash === '#members') {
    loading(projectContent);
    render(window.location.pathname + '/members', projectContent);
  }

  document.getElementById('membersButton').addEventListener('click', function (event) {
    loading(projectContent);
    render(window.location.pathname + '/members', projectContent);
  });

  if (linkHash === '#logs') {
    loading(projectContent);
    render(window.location.pathname + '/logs', projectContent);
  }

  document.getElementById('logsButton').addEventListener('click', function (event) {
    loading(projectContent);
    render(window.location.pathname + '/logs', projectContent);
  });

  document.getElementById('projectsButton').addEventListener('click', function (event) {
    window.location.hash = '';
    window.location.reload();
  });

/* /tabs */
  var mainConainer = document.getElementsByClassName('sprintStates')[0];
  onPageLoadCheck(mainConainer);
  /* Start new Sprint */
  var startSprintButton = document.getElementById('startSprintButton');
  if (startSprintButton) {
    document.getElementById('startSprintButton').addEventListener('click', function (e) {
      mainConainer.innerHTML = generateStartSprintForm();
      startSprintFormListener();
    });
  }

  /* Add New Task */
  var addTaskButton = document.getElementById('addTaskButton');
  var addTaskDiv = document.getElementsByClassName('addTaskDiv')[0];
  var backlogTasksDiv = document.querySelector('#backlog .stateTasks');

  addTaskButton.addEventListener('click', function (e) {
    renderAddTaskForm(addTaskDiv);
    addTaskFormListener(function (err, res) {
      if (err) {
        backlogTasksDiv.innerHTML = '<h2>Connection Error!</h2>';
      } else {
        loading(backlogTasksDiv);
        renderBacklog();
      }
    });
  });
})();

function onPageLoadCheck (container) {
  loading(container);
  // apiReq is defined in request.js
  apiReq(window.location.pathname + '/currentSprint', 'GET', function (err, data) {
    if (err) {
      container.innerHTML = '<h1>Failed to Load</h1>';
    } else {
      container.innerHTML = data;
    }
  });
}
function loading (container) {
  if (!container) {
    return console.error('Cannot load, no container found.')
  }
  container.innerHTML = '<h2>Loading.....</h2>';

}
function getData (url, cb) {
  apiReq(url,'GET', function (err, data) {// eslint-disable-line
    if (err) {
      cb('Connection Error!');
    } else {
      cb(null, data);
    }
  });
}

function render (url, container) {
  getData(url, function (err, data) {
    if (err) {
      container.innerHTML = '<h2>' + err + '</h2>';
    } else {
      container.innerHTML = data;
    }
  });
}

function loadState (id) {
  const tasksContainer = document.querySelector('#state-' + id + '>.stateTasks');
  loading(tasksContainer);

  // apiReq is defined in request.js
  apiReq(window.location.pathname + '/stateTasks/' + id, 'GET', function (err, data) {
    if (err) {
      tasksContainer.innerHTML = '<h1>Failed to Load</h1>';
    } else {
      tasksContainer.innerHTML = data;
    }
  });
}
function renderBacklog () {
  var tasksContainer = document.querySelector('#backlog .stateTasks');
  loading(tasksContainer);
  // apiReq is defined in request.js
  apiReq(window.location.pathname + '/backlogTasks', 'GET', function (err, data) {
    if (err) {
      tasksContainer.innerHTML = '<h1>Failed to Load</h1>';
    } else {
      tasksContainer.innerHTML = data;
    }
  });
}

function generateStartSprintForm () {
  return '<form id="startSprintForm">' +
          '<label>Sprint Duration' +
            '<input type="number" name="durationNumber" value="1" required>' +
            '<select name="duration">' +
              '<option value="7">W</option>' +
              '<option value="1">D</option>' +
            '</select>' +
          '</label>' +
          '<input type="submit" name="submit" value="Start!">' +
        '</form>';
}

function startSprintFormListener () {
  var startSprintForm = document.getElementById('startSprintForm');
  if (startSprintForm) {
    startSprintForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var startSprintData = event.target;
      var duration = parseInt(startSprintData[0].value) * parseInt(startSprintData[1].value);
      apiReq(window.location.pathname + '/createSprint', 'POST', function (err, data) {
        if (err) {
          alert('connection error');
        } else {
          if (data === '/rel') {
            var mainConainer = document.getElementsByClassName('sprintStates')[0];
            onPageLoadCheck(mainConainer);
          }
        }
      }, JSON.stringify(duration));
    });
  }
}
function renderAddTaskForm (container) {
  container.innerHTML = '<form id="addTaskForm" action="' + window.location.pathname + '/addTask" method="post">' +
                          '<label>Title : <input type="text" name="title" value="" placeholder="Enter task name.." required></label>' +
                          '<label>description : <input type="text" name="description" value="..." placeholder="Enter task description.."></label>' +
                          '<label>priority :' +
                            '<select name="priority">' +
                              '<option value="1">1</option>' +
                              '<option value="2">2</option>' +
                              '<option value="3">3</option>' +
                              '<option value="4">4</option>' +
                              '<option value="5">5</option>' +
                            '</select>' +
                          '</label>' +
                          '<label>deadline<input type="date" name="deadline" value="2014-02-09" required></label>' +
                          '<label>Duration<input type="number" name="duration" value="1" required>' +
                            '<select name="duration">' +
                              '<option value="1">H</option>' +
                              '<option value="24">D</option>' +
                              '<option value="168">W</option>' +
                            '</select>' +
                          '</label>' +
                          '<input type="submit" name="submit" value="Create Task!">' +
                        '</form>';
}
function addTaskFormListener (cb) {
  var addTaskForm = document.getElementById('addTaskForm');
  if (addTaskForm) {
    addTaskForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var addTaskData = event.target;
      var addTaskReq = {
        title: addTaskData[0].value,
        description: addTaskData[1].value,
        priority: addTaskData[2].value,
        deadline: addTaskData[3].value,
        duration: parseInt(addTaskData[4].value) * parseInt(addTaskData[5].value)
      };
      apiReq(window.location.pathname + '/addTask', 'POST', cb, JSON.stringify(addTaskReq));
    });
  }
}
