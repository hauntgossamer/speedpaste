const db = require("../knexconfig");

module.exports = { getText: (token) => {
    return db("pastedText")
        .select("text")
        .where({token})
        .first()
}, addText: (text, token) => {
    return db("pastedText")
        .insert({text, token})
}
}
