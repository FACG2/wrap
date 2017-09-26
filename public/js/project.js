(function () {
  var mainConainer = document.getElementsByClassName('sprintStates')[0];
  onPageLoadCheck(mainConainer);
  /* Start new Sprint */
  document.getElementById('startSprintButton').addEventListener('click', function (e) {
    mainConainer.innerHTML = generateStartSprintForm();
    startSprintFormListener();
  });

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
      apiReq(window.location.pathname + 'addTask', 'POST', function (err, data) {
        if (err || data === 'err') {
          console.log(err);
        } else {
          data = JSON.parse(data);
        }
      }, JSON.stringify(addTaskReq));
    });
  }
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
  container.innerHTML = '<h2>Loading.....</h2>';
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
  const tasksContainer = document.querySelector('#backlog .stateTasks');
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
      alert('hi')
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
