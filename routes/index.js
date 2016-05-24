'use strict';

var express = require('express');
var router = express.Router();
var Gcm = require('../models/gcm');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function (req, res, next) {

  console.log(req.body);

  //var devices = fse.readJsonSync(devicesFile);
  var username = req.body.username;
  var token = req.body.token;

  Gcm.checkDuplicated(req.db, username)
    .then(function (total) {
      if (total > 0) {
        // update
        Gcm.update(req.db, username, token)
          .then(function () {
            res.send({ ok: true });
          }, function (err) {
            res.send({ ok: false, msg: err });
          });
      } else {
        // new
        Gcm.save(req.db, username, token)
          .then(function () {
            res.send({ ok: true });
          }, function (err) {
            res.send({ ok: false, msg: err });
          });
      }

    });
  // if (devices.length) {
  //   // console.log('update');
  //   devices.forEach((v, idx) => {
  //     if (v.username == username) {
  //       devices[idx].token = token;
  //       console.log(devices[idx]);
  //     } else {
  //       var obj = {};
  //       obj.username = username;
  //       obj.token = token;
  //       devices.push(obj);
  //     }
  //   });
  // } else {
  //   // console.log('new');
  //   var obj = {};
  //   obj.username = username;
  //   obj.token = token;
  //   devices.push(obj);
  // }

  //console.log(devices);

 // fse.writeJsonSync(devicesFile, devices);

  // res.send({ ok: true });
});

router.get('/users', function (req, res, next) {

  Gcm.getUser(req.db)
    .then(function (rows) {
      res.send({ ok: true, rows: rows });
    }, function (err) {
      console.log(err);
      res.send({ ok: false, msg: err });
    });

});

router.post('/send', function (req, res, next) {

var gcm = require('node-gcm');
//var fse = require('fs-extra');

console.log(req.body);

var text = req.body.message;
var token = req.body.token;
var username = req.body.username;

var message = new gcm.Message();
message.addData('title', 'New message from: ' + username);
message.addData('message', text);
message.addData('content-available', true);
message.addData('username', username);
message.addData('image', 'http://www.pro.moph.go.th/w54/images/ICT/loadlogomoph.png');

var sender = new gcm.Sender('AIzaSyCKChSCsBci6BRju2bB9SvFiSa2Mo4w1vM');

sender.send(message, { registrationTokens: [token] }, function (err, response) {
  if (err) {
    console.error(err);
    res.send({ ok: false, msg: err })
  } else {
    console.log(response);
    res.send({ ok: true, msg: response });
  }
});

});

module.exports = router;
