var apiReq = apiReq || console.error('apiReq is undefined'); //eslint-disable-line

(function () {
  var addFeatureForm = document.getElementById('addFeatureForm');
  if (addFeatureForm) {
    addFeatureForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var addFeatureData = event.target;
      var addFeatureReq = {
        title: addFeatureData[0].value,
        id: parseInt(window.location.pathname[window.location.pathname.length - 1])
      };
      apiReq(window.location.pathname + '/addFeature', 'POST', function (err, data) {
        if (err) {
          window.alert('connection error');
        } else {
          addFeatureData[0].value = '';
          renderFeatures();
          renderProgress();
        }
      }, JSON.stringify(addFeatureReq));
    });
  }

// add comment
  var addCommentForm = document.getElementById('addCommentForm');
  if (addCommentForm) {
    addCommentForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var addCommentData = event.target;
      var addCommentReq = {
        context: addCommentData[0].value,
        id: parseInt(window.location.pathname[window.location.pathname.length - 1])
      };
      apiReq(window.location.pathname + '/addComment', 'POST', function (err, data) {
        if (err) {
          window.alert('connection error');
        } else {
          addCommentData[0].value = '';
          renderComments();
        }
      }, JSON.stringify(addCommentReq));
    });
  }
  renderLabels();
  renderProgress();
  renderFeatures();
  renderComments();
  renderAssign();
  renderMembersList();
  priorityListListener();

  // checkFeature();
})();
function loading (container) {
  container.innerHTML = '<h2>Loading.....</h2>';
}
function assignListListener () {
  var list = document.querySelectorAll('#assignList a');
  list = Array.from(list);
  list.forEach(function (element) {
    element.addEventListener('click', function (e) {
      apiReq(window.location.pathname + '/assignMember', 'POST', function (err, data) {
        if (err) {
          window.alert('connection error');
        } else {
          renderAssign();
        }
      }, JSON.stringify({username: element.innerHTML}));
    });
  });
}
function renderFeatures () {
  const featuresContainer = document.querySelector('#featuresDiv');
  loading(featuresContainer);
  apiReq(window.location.pathname + `/features`, 'GET', function (err, data) {
    if (err) {
      featuresContainer.innerHTML = '<h1>Failed to Load</h1>';
    } else {
      featuresContainer.innerHTML = data;
      FeatureEvenListener(featuresContainer);
    }
  });
}

function renderComments () {
  const commentsContainer = document.querySelector('#commentsDiv');
  loading(commentsContainer);
  apiReq(window.location.pathname + `/comments`, 'GET', function (err, data) {
    if (err) {
      commentsContainer.innerHTML = '<h1>Failed to Load</h1>';
    } else {
      commentsContainer.innerHTML = data;
    }
  });
}
function renderAssign () {
  const assignContainer = document.querySelector('#assignDiv span');
  loading(assignContainer);
  apiReq(window.location.pathname + `/assignMember`, 'GET', function (err, data) {
    if (err) {
      assignContainer.innerHTML = '<h1>Failed to Load</h1>';
    } else {
      data = JSON.parse(data);
      assignContainer.innerHTML = data.username;
    }
  });
}

function renderLabels () {
  const labelsContainer = document.getElementById('labels');
  loading(labelsContainer);
  apiReq(window.location.pathname + `/labels`, 'GET', function (err, data) {
    if (err) {
      labelsContainer.innerHTML = '<h1>Failed to Load</h1>';
    } else {
      labelsContainer.innerHTML = data;
    }
  });
}

function renderProgress () {
  const progress = document.querySelector('#progressBar');
  apiReq(window.location.pathname + `/progress`, 'GET', function (err, data) {
    if (err) {
      progress.innerHTML = '<h1>Failed to Load</h1>';
    } else {
      progress.innerHTML = data.substring(0, 4) + '%';
      progress.value = data;
      progress.style.width = data.substring(0, 4) + '%';
    }
  });
}
function FeatureEvenListener (container) {
  var featureCheckDivs = document.getElementsByClassName('featureCheck');
  if (featureCheckDivs[0]) {
    Array.from(featureCheckDivs).forEach(function (featureCheckDiv) {
      var id = parseInt(featureCheckDiv.id.split('-')[1]);
      featureCheckDiv.addEventListener('click', function (e) {
        apiReq(window.location.pathname + `/` + id, 'POST', function (err, data) {
          if (err) {
            container.innerHTML = '<h1>Failed to Load</h1>';
          } else {
            renderProgress();
          }
        }, JSON.stringify({checked: featureCheckDiv.checked}));
      });
    });
  }
}
function renderMembersList () {
  apiReq(window.location.pathname + '/members', 'GET', function (err, data) {
    if (err) {
      window.alert('User is not a member of this project!');
    } else {
      data = JSON.parse(data);
      document.getElementById('assignList').innerHTML = data.reduce(function (acc, member) {
        acc += '<a class="dropdown-item" href="#">' + member.username + '</a>';
        return acc;
      }, '');
      assignListListener();
    }
  });
}

function priorityListListener () {
  const priorityContainer = document.querySelector('#priorityId span');
  var list = document.querySelectorAll('#priorityList a');
  list = Array.from(list);
  list.forEach(function (element) {
    element.addEventListener('click', function (e) {
      apiReq(window.location.pathname + '/changePriority', 'POST', function (err, data) {
        if (err) {
          window.alert('connection error');
        } else {
          data = JSON.parse(data);
          priorityContainer.textContent = data.priority;
          priorityContainer.style.backgroundColor = data.priorityColor;
        }
      }, JSON.stringify({priority: element.textContent}));
    });
  });
}
