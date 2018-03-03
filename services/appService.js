var _connectionString = 'mongodb://team77:team777@ds155218.mlab.com:55218/team77'
var mongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID

function connect (callback) {
  mongoClient.connect(_connectionString, function (err, db) {
    callback(err, db)
  })
}

function insertDocument (db, collectionName, data, callback) {
  db.collection(collectionName).insertOne(data, function (err, result) {
    callback(err, result)
  })
}

function deleteDocument (db, collectionName, data, callback) {
  db.collection(collectionName).deleteOne(data, function (err, result) {
    callback(err, result)
  })
}

function findDocument (db, collectionName, value, column, callback) {
  console.log(column, value)
  db.collection(collectionName).findOne({username: value}, function (err, data) {
    callback(err, data)
  })
}

function getAll (db, collectionName, callback) {
  console.log(db);
  console.log(collectionName);
  db.collection(collectionName).find().toArray(function (err, data) {
    callback(err, data)
  })
}

module.exports = {
  addAlarm: function (data, callback) {
    connect(function (err, db) {
      if (err !== null) {
        db.close()
        callback(err)
        return
      }
        insertDocument(db, 'alarms', data, function (err, result) {
          db.close()
          callback(err, result)
        })
      })
  },

  delete: function (id, callback) {
    connect(function (err, db) {
      if (err !== null) {
        db.close()
        callback(err)
        return
      }
      deleteDocument(db, 'users', id, function (err, result) {
        db.close()
        callback(err, result)
      })
    })
  },

  getAllAlarms: function (callback) {
    connect(function (err, db) {
      if (err !== null) {
        db.close()
        callback(err)
        return
      }
      getAll(db, 'alarms', function (err, result) {
        db.close()
        callback(err, result)
      })
    })
  }

}
