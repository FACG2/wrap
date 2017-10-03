//
// const groupLabels = (arr) => {
//   let temp = [];
//   let temp2;
//   return arr.reduce((a, item) => {
//     temp2 = temp.indexOf(item.task_id);
//     if (temp2  !==-1) {
//       a[temp2].label.push({id: item.label_id, color: item.color, title: item.label_title});
//       return a;
//     }
//     temp.push(item.task_id);
//     a.push({id: item.task_id, title: item.title, progress: item.progress, priority: item.priority, userName: item.username, avatar: item.avatar, label: [{id: item.label_id, color: item.color, title: item.label_title}]});
//     return a;
//   }, []);
// }

const groupLabels = (arr) => {
  const itemToLabel = (item) => {
    if (item.label_id) {
      return {
        id: item.label_id,
        color: item.color,
        title: item.label_title
      };
    } else {
      return {};
    }
  };

  const groupedLabels = arr.reduce((a, item) => {
    if (a[item.task_id]) {
      a[item.task_id].label.push(itemToLabel(item));
    } else {
      a[item.task_id] = {
        id: item.task_id,
        title: item.title,
        progress: item.progress,
        priority: item.priority,
        project_id: item.project_id,
        label: [itemToLabel(item)]
      };
    }
    return a;
  }, {});

  return Object.keys(groupedLabels).map(taskId => groupedLabels[taskId]);
};

module.exports = {
  groupLabels
};
