'use strict';

var utils = require('../utils/writer.js');
var Quizz = require('../service/QuizzService');

module.exports.quizzCreatePOST = function quizzCreatePOST (req, res, next) {
  var create = req.swagger.params['create'].value;
  Quizz.quizzCreatePOST(create)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.quizzDeletePOST = function quizzDeletePOST (req, res, next) {
  var _delete = req.swagger.params['delete'].value;
  Quizz.quizzDeletePOST(_delete)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.quizzListGET = function quizzListGET (req, res, next) {
  Quizz.quizzListGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.quizzResultsGET = function quizzResultsGET (req, res, next) {
  var results = req.swagger.params['results'].value;
  Quizz.quizzResultsGET(results)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.quizzUpdatePOST = function quizzUpdatePOST (req, res, next) {
  var update = req.swagger.params['update'].value;
  Quizz.quizzUpdatePOST(update)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
