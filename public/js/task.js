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

// Assigm member
  var assignMemberForm = document.getElementById('assignMemberForm');
  if (assignMemberForm) {
    assignMemberForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var assignMemberData = event.target;
      var assignMemberReq = {
        username: assignMemberData[0].value
      };
      apiReq(window.location.pathname + '/assignMember', 'POST', function (err, data) {
        if (err) {
          window.alert('connection error');
        } else {
          assignMemberData[0].value = '';
          renderAssign();
        }
      }, JSON.stringify(assignMemberReq));
    });
  }
//add comment
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
  renderProgress();
  renderFeatures();
  renderComments();
  renderAssign();

  // checkFeature();
})();
function loading (container) {
  container.innerHTML = '<h2>Loading.....</h2>';
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
  const assignContainer = document.querySelector('#assignDiv');
  loading(assignContainer);
  apiReq(window.location.pathname + `/assignMember`, 'GET', function (err, data) {
    if (err) {
      assignContainer.innerHTML = '<h1>Failed to Load</h1>';
    } else {
      data = JSON.parse(data);
      assignContainer.innerHTML = '<h6 class="card-title " >Assign To: <span class="badge badge-primary">'+data.username+'</span> <i class="fa fa-plus-circle" aria-hidden="true" data-toggle="modal" data-target="#assignMember"></i></h6><hr class="mt-2">';
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
            // data = JSON.parse(data);
          }
        }, JSON.stringify({checked: featureCheckDiv.checked}));
      });
    });
  }
}
