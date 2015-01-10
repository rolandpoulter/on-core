// Copyright 2014, Renasar Technologies Inc.
/* jshint: node:true */

'use strict';

var _ = require('lodash');

module.exports = function (di, directory) {
    var helper = require('./lib/common/di.js')(di, directory || __dirname);

    return {
        helper: helper,
        injectables: _.flatten(
            [
                // NPM Packages
                helper.simpleWrapper(_, '_'),
                helper.requireWrapper('q', 'Q'),
                helper.requireWrapper('nconf'),
                helper.requireWrapper('waterline', 'Waterline'),
                helper.requireWrapper('sails-mongo', 'MongoAdapter'),
                helper.requireWrapper('amqplib', 'amqp'),

                // Glob Requirables
                helper.requireGlob(__dirname + '/lib/protocol/*.js'),
                helper.requireGlob(__dirname + '/lib/services/*.js'),
                helper.requireGlob(__dirname + '/lib/models/*.js'),

                // Non Glob Requirables
                require('./lib/common/constants'),
                require('./lib/common/logger'),
                require('./lib/common/model'),
                require('./lib/common/message'),
                require('./lib/common/subscription')
            ]
        )
    };
};
