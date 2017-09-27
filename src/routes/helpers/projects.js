const colors = {
  '-1': 'black',
  '1': '#e60606',
  '2': '#ffc107',
  '3': '#07ffca',
  '4': '#3907ff',
  '5': '#07ff50'
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
