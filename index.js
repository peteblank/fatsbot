require('dotenv').config();
const TeleBot = require('telebot');
const CoinGecko = require('coingecko-api');
const { EnigmaUtils, Secp256k1Pen, SigningCosmWasmClient, pubkeyToAddress, encodeSecp256k1Pubkey } = require("secretjs");
const { fromUtf8 } = require("@iov/encoding");
const { Client } = require('pg');
const fs = require("fs");

// Load sensitive information from environment variables
const botToken = process.env.BOT_TOKEN;
const secretKey = process.env.SECRET_KEY;
const mnemonic = process.env.MNEMONIC;
const databaseUrl = process.env.DATABASE_URL;
const httpUrl = process.env.SECRET_REST_URL;

const bot = new TeleBot(botToken);

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
};

async function fatscrt() {
    try {
        const cg = new CoinGecko();
        const secret = await cg.simple.price({
            ids: ['secret'],
            vs_currencies: ['usd'],
        });

        const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic);
        const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
        const accAddress = pubkeyToAddress(pubkey, 'secret');
        const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();

        const client = new SigningCosmWasmClient(
            httpUrl,
            accAddress,
            (signBytes) => signingPen.sign(signBytes),
            txEncryptionSeed, customFees
        );

        const contractAddress = 'secret1fspv4fzc90g72r22djhhtf2jrxvcte3dsvp2dk';
        const balanceQuery = {
            pool: {
                key: secretKey,
                address: accAddress
            }
        };
        const balance = await client.queryContractSmart(contractAddress, balanceQuery);
        const fats = balance.assets[0].amount;
        const sscrt3 = balance.assets[1].amount;
        const fatscrt = sscrt3 / fats / 1000;
        const fatscrt2 = fatscrt.toFixed(3);
        const dollars = secret.data.secret.usd;
        const dollars2 = (fatscrt2 * dollars).toFixed(3);

        const client2 = new Client({
            connectionString: databaseUrl,
            ssl: {
                rejectUnauthorized: false
            }
        });
        await client2.connect();

        const d = new Date().toISOString().replace(/T/, " ");
        const e = d.substr(0, 19);

        const replyText = `The price of FATS is: ${fatscrt2} sscrt ($${dollars2})`;
        
        bot.on(['/text', '/fats'], async (msg) => {
            await msg.reply.text(replyText);
            await client2.query(
                'INSERT INTO price(created_on, sscrt, dollars) VALUES ($1, $2, $3)',
                [e, fatscrt2, dollars2]
            );
            client2.end();
        });

        bot.on(['/luigi'], (msg) => msg.reply.text("@luigi1111 come do math"));

        console.log(fatscrt2);
        console.log(dollars2);
        console.log(e);

    } catch (error) {
        console.error('Error in fatscrt function:', error);
    }
}

bot.start(fatscrt);
