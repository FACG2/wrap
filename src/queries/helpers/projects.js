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
    return {
      id: item.label_id,
      color: item.color,
      title: item.label_title
    };
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
        label: []
      };
      if (item.label_id) {
        a[item.task_id].label = [itemToLabel(item)];
      }
    }
    return a;
  }, {});

  return Object.keys(groupedLabels).map(taskId => groupedLabels[taskId]);
};

const projectNav = (userId, projectNavArray) => {
  let caseText = projectNavArray.reduce(
  (acc, element) => acc += `when project_id = ${element.projectId} then ${element.navVal} `,
  'update user_project set project_nav = case '
  );
  caseText += `end where user_id = ${userId} AND (`;
  return projectNavArray.reduce((acc, element, i) => {
    acc += projectNavArray.length - 1 === i ? ` project_id = ${element.projectId}) RETURNING * ` : ` project_id = ${element.projectId} OR `;
    return acc;
  }, caseText);
};
// console.log(projectNav(7, [{projectId: 50, navVal: true}, {projectId: 51, navVal: true}, {projectId: 52, navVal: false}]));
/* We use this function to return this :(
update user_project set project_nav = case
when project_id = 49 then true
when project_id = 51 then true
when project_id = 53 then false
when project_id = 46 then true
end
where user_id = 7 AND (project_id = 49 OR project_id = 51 OR project_id = 53 OR project_id = 46)
*/

module.exports = {
  groupLabels,
  projectNav
};
