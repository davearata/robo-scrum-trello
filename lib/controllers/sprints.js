'use strict';

var mongoose = require('mongoose'),
  Sprint = mongoose.model('Sprint');

/**
 * Create team
 */
exports.create = function (req, res) {
  var newSprint = new Sprint(req.body);
  newSprint.save(function(err) {
    if (err) {
      return res.json(400, err);
    }

    return res.json(newSprint);
  });
};

/**
 *  Get a specific sprint
 */
exports.get = function (req, res, next) {
  var sprintId = req.params.id;

  Sprint.findById(sprintId, function (err, sprint) {
    if (err) {
      return next(err);
    }
    if (!sprint) {
      return res.send(404);
    }
    return res.json(sprint);
  });
};

/**
 *  Get all teams
 */
exports.all = function (req, res, next) {
  Sprint.find(function (err, sprints) {
    if (err) {
      return next(err);
    }

    return res.json(sprints);
  });
};
