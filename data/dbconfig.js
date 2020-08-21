const db = require("../knexconfig");

module.exports = { getText: (token) => {
    return db("pastedText")
        .select("text")
        .from("pastedText")
        .where({token: token})
        // .first()
}, addText: (text, token) => {
    return db("pastedText")
        .insert({text, token})
}
}
