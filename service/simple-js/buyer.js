var autobahn = require('autobahn');
var xbr = require('autobahn-xbr');
var web3 = require('web3');
var BN = web3.utils.BN;

console.log('Running on Autobahn ' + autobahn.version);

// WAMP connection
var connection = new autobahn.Connection({
    realm: "realm1",
    transports: [
        {
            //url: 'wss://continental2.crossbario.com/ws',
            url: 'ws://localhost:8080/ws',
            type: 'websocket',
            serializers: [ new autobahn.serializer.CBORSerializer() ],
        }
    ]
});

// callback fired upon new WAMP session
connection.onopen = function (session, details) {

    console.log("WAMP session connected:", details);

    // ethereum private key of buyer1 delegate1
    const buyer1_delegate2_pkey = "0x829e924fdf021ba3dbbc4225edfece9aca04b929d6e75613329ca6f1d31c0bb4";

    // market maker ethereum address
    const marketmaker_adr = "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9";

    // the XBR token has 18 decimals
    const decimals = new BN('1000000000000000000');

    // maximum price we are willing to pay per (single) key: 100 XBR
    const max_price = new BN('100').mul(decimals);

    // instantiate a simple buyer
    var buyer = new xbr.SimpleBuyer(marketmaker_adr, buyer1_delegate2_pkey, max_price);

    // start buying ..
    buyer.start(session).then(
        // success: we've got an active payment channel with remaining balance ..
        function (balance) {
            console.log("Buyer has started, remaining balance in active payment channel is " + balance.div(decimals) + " XBR");

            session.subscribe("io.crossbar.example", function (args, kwargs, details) {
                let [key_id, enc_ser, ciphertext] = args;

                // decrypt the XBR payload, potentially automatically buying a new data encryption key
                buyer.unwrap(key_id, enc_ser, ciphertext).then(
                    function (payload) {
                        console.log("Received event " + details.publication, payload)
                    },
                    function (failure) {
                        console.log(failure);
                        process.exit(1);
                    }
                )
            });

        },
        // we don't have an active payment channel => bail out
        function (error) {
            console.log("Failed to start buyer:", error);
            process.exit(1);
        }
    );
};

// open WAMP session
connection.open();
