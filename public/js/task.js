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
          alert('connection error');
        } else {
          renderFeatures();
        }
      }, JSON.stringify(addFeatureReq));
    });
  }

  var addCommentForm = document.getElementById('addCommentForm');
  if (addCommentForm) {
    addCommentForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var addCommentData = event.target;
      var addCommentReq = {
        context: addCommentData[0].value,
        id:parseInt(window.location.pathname[window.location.pathname.length - 1])
      };
      apiReq(window.location.pathname + '/addComment', 'POST', function (err, data) {
        if (err) {
          alert('connection error');
        } else {
            renderComments();
        }
      }, JSON.stringify(addCommentReq));
    });
  }

  renderFeatures();
  renderComments();
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
