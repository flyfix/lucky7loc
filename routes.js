var express = require('express')
var cordsController = require('./controllers/cords/cordsController')
var bodyParser = require('body-parser')

var router = express.Router()
router.use(cordsController.middleware)

// support parsing of application/json type post data
router.use(bodyParser.json())

// support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }))

router.route('/alarms')
  .post(cordsController.addAlarm)

  router.route('/lastCords')
  .get(cordsController.getLastCords)

router.route('/alarms')
  .get(cordsController.getAll)

router.route('/alarms/:id')
  .get(cordsController.get)

router.route('/devices')
  .get(cordsController.getDevicesList)


module.exports = router
