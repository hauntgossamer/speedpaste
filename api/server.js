const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const axiosWithAuth = require("../utils/axiosWithAuth").axiosWithAuth()
const server = express();
const options = {
    origin: "https://speedpaste.netlify.app"
}
const CryptoJS = require("crypto-js");

const db = require("../data/dbconfig");
server.use(express.json());
server.use(cors(options));
server.use(helmet());
server.get("/", (req, res) => {
    res.status(200).json({"up": "up"});
});
server.get("/copy/:token", (req, res) => {
    db.getText(req.params.token)
        .then(text => {
            res.status(200).json({text: `${JSON.parse(text.text)}`})})
        .catch(err => res.status(400).json({ error: err.message }))
})
server.post("/pasting", (req, res) => {
    const pastedText = JSON.stringify(req.body.text).slice(0, 36);
    const token = CryptoJS.AES.encrypt(req.body.text, `${Math.random()}`).toString().replace(/\//g, "")
    db.addText(pastedText, token)
        .then(() => {
            axiosWithAuth
                .post("/shorten", {
                    "long_url": `https://speedpaste.netlify.app/copying/${token}`,
                    "domain": "bit.ly",
                })
                .then(ans => res.status(200).json({ link: ans.data.link, token }))
                .catch(err => res.status(400).json({err}))
        })
        .catch(err => res.status(400).json(err))
    
    // turn pastedText into a token and send back a token and a bit.ly link
    // token, link to be shortened = `https://speedpaste.netlify.app/copying/${token}`
})
module.exports = server;