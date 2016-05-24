var Q = require('q');

module.exports = {

  save(db, username, token) {
    var q = Q.defer();

    db('devices')
      .insert({
        username: username,
        token: token
      })
      .then(function () {
        q.resolve();
      })
      .catch(function (err) {
        q.reject(err);
      });

    return q.promise;

  },

  update(db, username, token) {
    var q = Q.defer();

    db('devices')
      .update({
        token: token
      })
      .where('username', username)
      .then(function () {
        q.resolve();
      })
      .catch(function (err) {
        q.reject(err);
      });

    return q.promise;

  },
  checkDuplicated(db, username) {
    var q = Q.defer();
    db('devices')
      .count('* as total')
      .where('username', username)
      .then(function (rows) {
        q.resolve(rows[0].total);
      })
      .catch(function (err) {
        q.reject(err);
      });

    return q.promise;
  },

  getUser(db) {
    var q = Q.defer();
    db('devices')
      .select()
      .groupBy('username')
      .then(function (rows) {
        q.resolve(rows);
      })
      .catch(function (err) {
        q.reject(err);
      });

    return q.promise;
  }

};