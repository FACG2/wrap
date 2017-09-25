
const groupLabels = (arr) => {
  let temp = [];
  let temp2;
  return arr.reduce((a, item) => {
    temp2 = temp.indexOf(item.task_id);
    if (temp2) {
      a[temp2].label.push({id: item.label_id, color: item.color, title: item.label_title});
      return a;
    }
    temp.push(item.task_id);
    a.push({id: item.task_id, title: item.title, progress: item.progress, priority: item.priority, userName: item.username, avatar: item.avatar, label: [{id: item.label_id, color: item.color, title: item.label_title}]});
    return a;
  }, []);
};

module.exports = {
  groupLabels
};
