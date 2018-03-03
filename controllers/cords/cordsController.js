var express = require('../../node_modules/express')
var alarm = require('../../entities/alarm')
var cord = require('../../entities/cord')
var device = require('../../entities/device')
var formidable = require('../../node_modules/formidable')
var cordsService = require('../../services/cordsService')
var cordsUdpService = require('../../services/cordsUdpService')

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

  getAll: function (req, res) {
    console.log('getAll')
    var alarm1 = new alarm.Alarm("Patient running from hospital",new Date().toLocaleString(),new Date().toLocaleString(),"Igor-Beacon");
    var alarm2 = new alarm.Alarm("Patient left room",new Date().toLocaleString(),new Date().toLocaleString(),"Adam-Beacon");
    var alarm3= new alarm.Alarm("Patient left room",new Date().toLocaleString(),new Date().toLocaleString(),"Adam-Beacon");
    var data = [alarm1,alarm2,alarm3];


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
    res.send(data).end()
  },

  getDevicesList: function (req, res) {
    var device1 = new device.Device("31364719343730393F0430","Sleepwalker-Token");
    var device2 = new device.Device("3136471734373039330380","RobberDockor-Token")
    var devices = [device1,device2];
    res.send(devices).end()
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
