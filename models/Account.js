var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  name: String,
  status: Number
});


var Account = mongoose.model('Account', AccountSchema);

module.exports = Account;