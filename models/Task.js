var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
  name: String,
  clientidentifier: String,
  type: String,
  assigndate: { type : Date, default: Date.now },
  duedate: { type : Date, default: Date.now },
  estEffort: Number,
  template: String,
  keyword: String,
  remark: String,
  eta: String,
  assets: String,
  allocation: [{
                user: { type : mongoose.Schema.Types.ObjectId, ref: 'User' },
                effort: { type : Number, default: 0 },
                date: { type : Date, default: Date.now }

              }],
  status: { type : String, default: 'inqueue' }
});


var Task = mongoose.model('Task', TaskSchema);

module.exports = Task;