//Connect to Crossbarfx node
var connection = new autobahn.Connection({
  url: "ws://dmp.local:8080/ws",
  type: 'websocket',
  serializers: [ new autobahn.serializer.CBORSerializer() ],
  realm: "realm1"
});

connection.onopen = function(session) {
  console.log("Connected.");
  // ethereum private key of buyer1 delegate1
  const buyer1_delegate2_pkey =
    "0x2d2719c6a828911ed0c50d5a6c637b63353e77cf57ea80b8e90e630c4687e9c5";

  // market maker ethereum address
  const marketmaker_adr = "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9";

   // instantiate a simple buyer
    var buyer = new autobahnXbr.SimpleBuyer(marketmaker_adr, buyer1_delegate2_pkey, 100);
        // start buying ..
        buyer.start(session).then(
            // success: we've got an active payment channel with remaining balance ..
            function (balance) {
              buyer.balance().then(function(b) {
                console.log(b);
                session.subscribe('vehicle.sumo', (args) => {
                  var keyID = args[0];
                  var cipherText = args[2];
                  buyer.unwrap(keyID, cipherText).then(function(result) {
                    console.log(result);
                  }, function (error) {
                    console.log(error);
                  }) 
                }, {match:'prefix'})
              }, function (error) {
                console.log(error);
              })
              console.log(balance)
                //console.log("Buyer has started, remaining balance in active payment channel is " + balance.div(decimals) + " XBR");
    
            },
            // we don't have an active payment channel => bail out
            function (error) {
                console.log("Failed to start buyer:", error);
            }
    );
};

connection.open();
