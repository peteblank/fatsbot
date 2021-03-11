// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
const CoinGecko = require('coingecko-api');
const { ActivityHandler, MessageFactory } = require('botbuilder');
  // Load environment variables
 

 
 
  const customFees = {
    upload: {
        amount: [{ amount: "2000000", denom: "uscrt" }],
        gas: "2000000",
    },
    init: {
        amount: [{ amount: "500000", denom: "uscrt" }],
        gas: "500000",
    },
    exec: {
        amount: [{ amount: "500000", denom: "uscrt" }],
        gas: "500000",
    },
  }
  class EchoBot extends ActivityHandler {
    constructor() {  
        
        super();
 
      


     this.onMessage( async (context, next) => {
         
          const cg = new CoinGecko();
          
          const secret=await cg.simple.price({
    ids: ['secret'],
    vs_currencies: ['usd'],
});

const {
    EnigmaUtils, Secp256k1Pen, SigningCosmWasmClient, pubkeyToAddress, encodeSecp256k1Pubkey, unmarshalTx
  } = require("secretjs");
const { fromUtf8 } = require("@iov/encoding");
 require('dotenv').config();
  
  const fs = require("fs");

    const httpUrl = process.env.SECRET_REST_URL;
  
    // Use key created in tutorial #2
    const mnemonic = process.env.MNEMONIC;
  
    // A pen is the most basic tool you can think of for signing.
    // This wraps a single keypair and allows for signing.
    const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic);
  
    // Get the public key
    const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
  
    // get the wallet address
    const accAddress = pubkeyToAddress(pubkey, 'secret');
  
    const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();
    
    const client = new SigningCosmWasmClient(
        httpUrl,
        accAddress,
        (signBytes) => signingPen.sign(signBytes),
        txEncryptionSeed, customFees
    );
    
    // Upload the wasm of a simple contract
  
    // Get the code ID from the receipt


  
    // Create an instance of the token contract, minting some tokens to our wallet
    // Entropy: Secure implementation is left to the client, but it is recommended to use base-64 encoded random bytes and not predictable inputs.

    var contractAddress='secret1fspv4fzc90g72r22djhhtf2jrxvcte3dsvp2dk';
    const secretkey="bananapapaya";

    // Convert the UTF8 bytes to String, before parsing the JSON for the api key.
    

    // Query balance with the api key
 
   const balanceQuery = { 
      pool: {
            key: secretkey, 
            address: accAddress
        }
    };
       const balance = await client.queryContractSmart(contractAddress, balanceQuery);
     const fats= balance.assets[0].amount;
    const sscrt= balance.assets[1].amount;
    const fatscrt=sscrt/fats/1000;
console.log(context._activity.text);
            const replyText ="the price of FATS is: "+fatscrt.toString()+" sscrt"+"($"+fatscrt.toString()*secret.data.secret.usd.toString()+")";
           if (context._activity.text=="/text" || context._activity.text=="/fats@fatscrtbot"){
            await context.sendActivity(MessageFactory.text(replyText, replyText));
              await next();
           }
           else
           {return}
            // By calling next() you ensure that the next BotHandler is run.
          
            
       
     });
    }
  }
 module.exports.EchoBot = EchoBot;



