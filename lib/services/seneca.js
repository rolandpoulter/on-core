// Copyright 2015, EMC, Inc.

'use strict';

if (typeof Symbol === 'function' && typeof Symbol.for !== 'function') {
  Symbol.for = function (k) { return '_' + k; };
}

var Seneca = require('seneca');

var seneca = Seneca({
    tag: 'rackhd'
});

seneca.use('mesh', {
    // bases: ['127.0.0.1']
    isbase: true
});

seneca.ready(() => {
    console.log('Seneca service ready!', seneca.id);
});

module.exports = senecaServiceFactory;

senecaServiceFactory.$provide = 'Services.Seneca';
senecaServiceFactory.$inject = [];

function senecaServiceFactory() {
    seneca.start = function () {
      return new Promise(function (resolve, reject) {
        seneca.ready((err) => {
          if (err) return reject(err);
          resolve(seneca);
        });
      });
    };

    seneca.stop = function () { return Promise.resolve(); };

    return seneca;
}
