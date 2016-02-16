import React from 'react';
import request from 'superagent';

function loadData(path, cb) {
  request
    .get(path)
    .end((err, res) => {
      if (err) { console.log(err); }

      var routes = JSON.parse(res.text).routes;
      this.setState({ routes });
    });
    if (cb) {
      cb();
    }
}

export { loadData }
