(function () {
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
      apiReq(window.location.pathname+'addTask', 'POST', function (err, data) {
        if (err || data === 'err') {
          console.log(err);
        } else {
          data = JSON.parse(data);
          console.log(data);
        }
      }, JSON.stringify(addTaskReq));
    });
  }
})();
