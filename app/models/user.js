var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false,

  initialize: function() {
    var un = this.get('username');
    var pw = this.get('password');

    bcrypt.hash(pw, null, null, function(err, hash) {
      if (err) {
        console.log('Bcrypt error in hash');
      } else {
        db.knex('users')
        .where('username', '=', un)
        .update({
          password: hash
        }).then(function() {
          // console.log('Update complete');
        });
      }
    });
  }
});

module.exports = User;