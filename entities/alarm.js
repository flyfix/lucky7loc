module.exports = {
  Alarm: function (id,message,timeWhenShow, timestamp, creatorWristId,receiverWristId) {
    this.id = id;
    this.message = message;
    this.timestamp = timestamp;;
    this.timeWhenShow = timeWhenShow
    this.creatorWristId = creatorWristId;
    this.receiverWristId = receiverWristId;
  }
}
