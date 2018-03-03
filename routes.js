var express = require('express')
var appController = require('./controllers/appController')
var bodyParser = require('body-parser')

var router = express.Router()
router.use(appController.middleware)

// support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }))
// support parsing of application/json type post data
router.use(bodyParser.json())



router.route('/addAlarm')
  .get(appController.addAlarm)

  router.route('/lastCords')
  .get(appController.getLastCords)

router.route('/alarms')
  .get(appController.getAllAlarms)

router.route('/alarms/:deviceId')
  .get(appController.get)

router.route('/alarmsemergency')
  .get(appController.getEmergencyAlarms);

router.route('/devices')
  .get(appController.getDevicesList)

router.route('/alarms/complete')
  .get(appController.completeAlarm);


module.exports = router
