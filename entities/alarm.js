module.exports = {
  Alarm: function (message, timestamp, deviceId,timeWhenShow) {
    this.message = message
    this.timestamp = timestamp
    this.timeWhenShow = timeWhenShow
    this.deviceId = deviceId;
  }
}
