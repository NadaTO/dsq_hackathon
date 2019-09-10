const autobahn = require("autobahn");
const config = require("./config");
const XBR = require("autobahn-xbr");
var web3 = require("web3");
var BN = web3.utils.BN;

const decimals = new BN("1000000000000000000");
const connection = new autobahn.Connection({
  url: config.CBFX_URL,
  realm: "realm1",
  type: "websocket",
  serializers: [new autobahn.serializer.CBORSerializer()]
});

function main(connection) {
  connection.onopen = async (session, details) => {
    console.log("Connected to Crossbarfx edge");
    let balance = {
      amount: 0,
      remaining: 0,
      inflight: 0
    };
    const maxPrice = new BN(100).mul(decimals); //Max buy price
    //Start buyer witn max buy price/Check with market maker if payment channel exists
    try {
      const buyer = new XBR.SimpleBuyer(
        "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9",
        "0x2d2719c6a828911ed0c50d5a6c637b63353e77cf57ea80b8e90e630c4687e9c5",
        maxPrice
      );
      await buyer.start(session);
      balance = await buyer.balance();

      //Subscribe to topic
      session.register("team.backend.subscribe", async args => {
        try {
          await session.subscribe(
            "vehicle.sumo",
            async args => {
              try {
                //Buy and decrypt
                const keyID = args[0];
                const cipherText = args[2];
                console.log(args);
                const result = buyer.unwrap(keyID, cipherText);
                console.log("Decrypted");
                console.log(result);
              } catch (e) {
                console.log(e);
              }
            },
            { match: "prefix" }
          );
        } catch (e) {
          console.log(e);
        }
      });

      //Buy and decrypt
    } catch (e) {
      console.log(e);
    }
  };

  connection.open();
}

main(connection);
