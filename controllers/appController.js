var express = require('../node_modules/express')
var alarm = require('../entities/alarm')
var cord = require('../entities/cord')
var device = require('../entities/device')
var formidable = require('../node_modules/formidable')
var cordsService = require('../services/cordsService')
var cordsUdpService = require('../services/cordsUdpService')

var app = express()

module.exports = {
  middleware: function (req, res, next) {
    console.log(req.method, req.url)
    res.header('Access-Control-Allow-Headers', '*')
    // res.header({'Content-Type': 'application/json'})
    next()
  },

  addAlarm: function (req, res) {
    console.log('body:', req.body)
    var message = req.body.message
    var timestamp = req.body.timestamp
    var timeWhenShow = req.body.timeWhenShow;
    var deviceId = req.body.deviceId

    if (message == undefined || timestamp == undefined || deviceId == undefined || timeWhenShow == undefined ) {
      res.status(400).end('Incorrect parameters')
      return
    }
    var alarm1 = new alarm.Alarm(message,timestamp,timeWhenShow,device);
    res.status(201).send("Created").end();
    // cordsService.add(account, function (err, data) {
    //   if (err !== null) {
    //     if (err.code === 409) {
    //       res.status(409).send(err)
    //       return
    //     }else {
    //       res.status(500).send(err)
    //       return
    //     }
    //   }
    //   res.status(201).send(data.insertedId).end()
    // })
  },

  getAllAlarms: function (req, res) {
    var wristId = req.query.wristId;
    if (wristId === undefined) {
      res.status(400).end()
      return
    }
    var alarm1 = new alarm.Alarm(1,"Patient running from hospital",new Date().toLocaleString(),new Date().toLocaleString(),"31364719343730393F0430","wrist1Id","wrist2Id");
    var alarm2 = new alarm.Alarm(2,"Patient left room",new Date().toLocaleString(),new Date().toLocaleString(),"3136471734373039330380","wrist1Id","wrist2Id");
    var alarm3= new alarm.Alarm(3,"Apoitment",new Date().toLocaleString(),new Date().toLocaleString(),"3136471734373039330380","wrist2Id","wrist1Id");
    var data = [alarm1,alarm2,alarm3];
    data =data.filter(function(alarm) {
      return alarm.receiverWristId === wristId;
    })
    res.status(200);
    res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify(data)).end()
    // cordsService.getAll(function (err, data) {
    //   if (err !== null) {
    //     res.status(500, err).end()
    //     return
    //   }
    //   // To moze byc problem ale nie wiem dlaczego niedziala 

    //   res.send(JSON.stringify(data)).end()
    // })
  },


  getLastCords: function (req, res) {
    var deviceId = req.query.deviceId;
    if (deviceId === undefined) {
      res.status(400).end()
      return
    }

    var x = Math.round( (Math.random() * 12) + 1,3);
    var y = Math.round( (Math.random() * 12) + 1,3);
    var z = Math.round( (Math.random() * 12) + 1,3);

    var data = new cord.Cord(deviceId,'2018-03-03 11:03:48',1.200,0.800,5.200);
    console.log(data);
    res.status(200);
    res.send(data).end()
  },

  getDevicesList: function (req, res) {
    var device1 = new device.Device("31364719343730393F0430","wrist1Id","Sleepwalker-Token");
    var device2 = new device.Device("3136471734373039330380","wrist2Id","RobberDockor-Token")
    var devices = [device1,device2];

    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(devices)).end()
    return;
  },


  get: function (req, res) {
    var id = req.params.id
    if (id === undefined) {
      res.status(400).end()
      return
    }

    cordsService.get(id, function (err, data) {
      if (err !== null) {
        res.status(500, err).end()
        return
      }
      if (data == undefined) {
        res.status(404).end()
        return
      }
      // To moze byc problem ale nie wiem dlaczego niedziala 
      // res.writeHead(200, {'Content-Type': 'application/json'})
      res.send(data).end()
    })
  }
}
