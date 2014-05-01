'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Sprint Schema
 */
var SprintSchema = new Schema({
  name: String,
  teamId: String,
  startDate: Date,
  endDate: Date
});

/**
 * Validations
 */
SprintSchema.path('name').validate(function (name) {
  return name.length;
}, 'Name must be set');

mongoose.model('Sprint', SprintSchema);
