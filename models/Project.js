var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  projectid: String,
  projectname: String,
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
  startdate: {type: Date, default: Date.now},
  enddate: {type: Date, default: Date.now},
  billablehours: {type: Number, default: 0 },
  amount: {type: Number, default: 0 },
  invoiced: {type: Number, default: 0 },
  status: {type: Number, default: 0 }
});


var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;