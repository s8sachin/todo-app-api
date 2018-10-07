var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'NOT DONE'
  }
});

TaskSchema.plugin(timestamps);
module.exports = mongoose.model('Task', TaskSchema);
