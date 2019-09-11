const autobahn = require("autobahn");
const config = require("./config");
const XBR = require("autobahn-xbr");
var web3 = require("web3");
var BN = web3.utils.BN;

const decimals = new BN("1000000000000000000");
const connection = new autobahn.Connection({
  url: config.CBFX_URL,
  realm: config.TEAM_RELM,
  type: "websocket",
  serializers: [new autobahn.serializer.CBORSerializer()]
});

function main(connection) {
  connection.onopen = async (session, details) => {
    console.log("Connected to Crossbarfx edge");
    const maxPrice = new BN(40).mul(decimals); //Max buy price
    //Start buyer witn max buy price/Check with market maker if payment channel exists
    try {

      const buyer = new XBR.SimpleBuyer(
        config.XBR_MARKET_MAKER_ADDR,
        config.PERSONA_PRIVKEY,
        maxPrice
      );

      await buyer.start(session);
      //Buy and decrypt
      session.register("persona.buy_data", async args => {
        try {
          await session.subscribe(
            config.TOPIC,
            async args => {
              try {
                //Buy and decrypt
                const keyID = args[0];
                const enc = args[1];
                const cipherText = args[2];
                const result = await buyer.unwrap(keyID, enc, cipherText);
                await session.publish("persona.service", [result], {aknowledge: true});
              } catch (e) {
                console.log(e);
              }
            },
            { match: "prefix" }
          );
          return true;
        } catch (e) {
          return false;
        }
      });

      //Opt-in
      session.register("persona.opt_in", async (args) => {
        return true;
      })
    } catch (e) {
      console.log(e);
    }
  };

  connection.open();
}

main(connection);
