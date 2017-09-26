(function () {
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
