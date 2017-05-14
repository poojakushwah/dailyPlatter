var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TimesheetSchema = new Schema({
  user: {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
  task: {type : mongoose.Schema.Types.ObjectId, ref: 'Task'},
  date: { type : Date, default: Date.now },
  effort: Number,
  status: {type: Number, default: 1 }
});


var Timesheet = mongoose.model('Timesheet', TimesheetSchema);

module.exports = Timesheet;