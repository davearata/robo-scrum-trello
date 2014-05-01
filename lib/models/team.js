'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Team Schema
 */
var TeamSchema = new Schema({
  name: String,
  members: []
});

/**
 * Validations
 */
TeamSchema.path('name').validate(function (name) {
  return name.length;
}, 'Name must be set');

mongoose.model('Team', TeamSchema);
