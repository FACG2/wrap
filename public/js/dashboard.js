(function () {
  var linkHash = window.location.hash;
  var dashboardContent = document.getElementById('dashboardContent');
  if (linkHash === '#tasks') {
    loading(dashboardContent);
    renderTasks(dashboardContent);
  }
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
          return acc += '<p>task id : ' + task.id + '</p>';
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
