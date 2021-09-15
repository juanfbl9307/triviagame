'use strict';

var utils = require('../utils/writer.js');
var Answers = require('../service/AnswersService');

module.exports.answerCreatePOST = function answerCreatePOST (req, res, next) {
  var create = req.swagger.params['create'].value;
  Answers.answerCreatePOST(create)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.answerDeletePOST = function answerDeletePOST (req, res, next) {
  var _delete = req.swagger.params['delete'].value;
  Answers.answerDeletePOST(_delete)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.answerListGET = function answerListGET (req, res, next) {
  Answers.answerListGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.answerUpdatePOST = function answerUpdatePOST (req, res, next) {
  var update = req.swagger.params['update'].value;
  Answers.answerUpdatePOST(update)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
