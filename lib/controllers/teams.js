'use strict';

var mongoose = require('mongoose'),
  Team = mongoose.model('Team');

/**
 * Create team
 */
exports.create = function (req, res) {
  var newTeam = new Team(req.body);
  newTeam.save(function(err) {
    if (err) {
      return res.json(400, err);
    }

    return res.json(newTeam);
  });
};

/**
 *  Get a specific team
 */
exports.get = function (req, res, next) {
  var teamId = req.params.id;

  Team.findById(teamId, function (err, team) {
    if (err) {
      return next(err);
    }
    if (!team) {
      return res.send(404);
    }
    return res.json(team);
  });
};

/**
 *  Get all teams
 */
exports.all = function (req, res, next) {
  Team.find(function (err, teams) {
    if (err) {
      return next(err);
    }

    return res.json(teams);
  });
};
