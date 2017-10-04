const colors = {
  '-1': 'black',
  '1': '#ff0026',
  '2': '#f5ff51',
  '3': '#ff9538',
  '4': '#3b69f7',
  '5': '#e4e4e4'
};

const addPriorityColors = (tasksArr) => {
  return tasksArr.map((task) => {
    task.priorityColor = colors[task.priority];
    return task;
  });
};
const addPriorityColor = (task) => {
  task.priorityColor = colors[task.priority];
  return task;
};
module.exports = {
  addPriorityColors,
  addPriorityColor
};
