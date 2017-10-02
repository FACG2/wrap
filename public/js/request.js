function apiReq (url, method, callback, postData) { // eslint-disable-line
  var xhttp = new XMLHttpRequest();// eslint-disable-line
  xhttp.onreadystatechange = function () {
    var myJSONRemote;
    if (this.readyState === 4 && this.status === 200) {
      myJSONRemote = this.responseText;
      callback(null, myJSONRemote);
    } else if (this.status === 500) {
      myJSONRemote = this.responseText;
      callback(myJSONRemote);
    }
  };

  xhttp.open(method, url, false);
  if (postData) {
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(postData);
  } else {
    xhttp.send();
  }
}
