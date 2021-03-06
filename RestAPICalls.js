var http = require('http');
var path = require('path');
var async = require('async');

var socketio = require('socket.io');
var express = require('express');

var getdata = require('test_data/getdata.json');
var postdata = require('test_data/postdata.json');
var router = express();

var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var holders = [];

io.on('connection', function (holder) {
    messages.forEach(function (data) {
      holder.emit('message', data);
    });

    holders.push(holder);

    holder.on('disconnect', function () {
      holders.splice(holders.indexOf(holder), 1);
      updateRoster();
    });

    holder.on('message', function (msg) {
      var text = String(msg || '');

      if (!text)
        return;

      holder.get('name', function (err, name) {
        var data = {
          name: name,
          text: text
        };

        broadcast('message', data);
        messages.push(data);
      });
    });

    holder.on('identify', function (name) {
      holder.set('name', String(name || 'Anonymous'), function (err) {
        updateRoster();
      });
    });
  });

function updateRoster() {
  async.map(
    holders,
    function (holder, callback) {
      holder.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  holders.forEach(function (holder) {
    holder.emit(event, data);
  });
}

//Get a review
router.get('/review/:reviewid', function(req, res){
    res.json(getdata);
});

//Get random reviews by stars
router.get('/review/:n/:stars', function(req, res){
    res.json(getdata);
});

//Get random reviews by dat
router.get('/review/:n/:from_date/:to_date', function(res, req){
    res.json(getdata);
});

//Add a review
router.post('/review', function(req, res) {
    res.json(postdata);
});

//Update a review
router.put('/:reviewid', function(req, res){
    res.json(postdata);
});

//Delete a review
router.delete('/:reviewid', function(req, res){
    res.json(postdata);
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
