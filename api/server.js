const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const axiosWithAuth = require("../utils/axiosWithAuth").axiosWithAuth()
const server = express();
const options = {
    origin: "http://localhost:3000"
}
const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");

const db = require("../data/dbconfig");
server.use(express.json());
server.use(cors(options));
server.use(helmet());
server.get("/", (req, res) => {
    res.status(200).json({"up": "up"});
});
server.get("/copy/:token", (req, res) => {
    db.getText(req.params.token)
        .then(text => res.status(200).json(text))
})
server.post("/pasting", (req, res) => {
    const pastedText = req.body.text;
    console.log(pastedText)
    const token = CryptoJS.AES.encrypt(pastedText, 'If you\'re good at something, never doit for free').toString()
    db.addText(pastedText, token)
        .then(() => {
            console.log(token)
            axiosWithAuth
                .post("/shorten", {
                    "long_url": `https://speedpaste.netlify.app/copying/${token}`,
                    "domain": "bit.ly",
                })
                .then(ans => res.status(200).json({ link: ans.data }))
                .catch(err => res.status(400).json({err}))
        })
        .catch(err => res.status(400).json(err))
    
    // turn pastedText into a token and send back a token and a bit.ly link
    // token, link to be shortened = `https://speedpaste.netlify.app/copying/${token}`
})
module.exports = server;