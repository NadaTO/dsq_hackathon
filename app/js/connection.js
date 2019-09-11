//Connect to Crossbarfx node
var connection = new autobahn.Connection({
  url: "ws://dmp.local:8080/ws",
  type: "websocket",
  serializers: [new autobahn.serializer.CBORSerializer()],
  realm: "realm1"
});

connection.onopen = function(session) {
  console.log("Connected To Crossbarfx");

  //Handler for buy button
  document.getElementById("buy_data_button").addEventListener("click", e => {
    e.preventDefault();
    session.call("team.buy_data").then(
      success => {
        if (success) {//If subscription is successfull register to topic
          session
            .subscribe("team.service", result => {
              console.log(result);
            })
            .then(
              result => {
                console.log(result);
              },
              error => {
                console.log(error);
              }
            );
        }
      },
      error => {
        console.log(error);
      }
    );
  });

  document.getElementById("opt-in-button").addEventListener("click", e => {
    e.preventDefault();
  });
};

connection.open();
