'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Thing Schema
 */
var ImageSchema = new Schema({
  img: { data: Buffer, contentType: String }
});



mongoose.model('Image', ImageSchema);