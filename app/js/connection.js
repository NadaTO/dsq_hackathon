//Connect to Crossbarfx node
var connection = new autobahn.Connection({
  url: "ws://dmp.local:8080/ws",
  type: "websocket",
  serializers: [new autobahn.serializer.CBORSerializer()],
  realm: "realm1"
});

connection.onopen = function(session) {
  console.log("Connected To Crossbarfx");
  const listGroup = document.getElementById("list-group");
  const buyButton = document.getElementById("buy_data_button");
  const optInButton = document.getElementById("opt_in_button");
  //Handler for buy button
  buyButton.addEventListener("click", e => {
    e.preventDefault();
    session.call("persona.buy_data").then(
      success => {
        if (success) { //If subscription is successfull register to topic
          session
            .subscribe("persona.service", result => {
              //Callback triggered on publish event
              const lat = result[0].lat;
              const lon = result[0].lng;
              const node = document.createElement("li");
              const textNode = document.createTextNode("Lat: " + lat + " Lon:" + lon);
              node.className= "list-group-item";
              node.appendChild(textNode);
              listGroup.appendChild(node)
            })
            .then(
              result => {
                console.log("Subscription successful.");
                buyButton.setAttribute('disabled', true);
              },
              error => {
                console.log('Subscription failed.');
              }
            );
        }
      },
      error => {
        console.log(error);
      }
    );
  });

  //Handler for opt-in
  optInButton.addEventListener("click", e => {
    e.preventDefault();
    session.call("persona.opt_in").then(
      success => {
        if (success) { //If subscription is successfull register to topic
          console.log('Opt-in successful');
          buyButton.removeAttribute('disabled');
          optInButton.setAttribute('disabled', true);
        }
      },
      error => {
        console.log(error);
      }
    );
  });
};

connection.open();
