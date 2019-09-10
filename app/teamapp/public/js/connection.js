//Connect to Crossbarfx node
var connection = new autobahn.Connection({
  url: "ws://dmp.local:8080/ws",
  type: 'websocket',
  serializers: [ new autobahn.serializer.CBORSerializer() ],
  realm: "realm1"
});

connection.onopen = function(session) {
  console.log("Connected To Crossbarfx");
};

connection.open();
