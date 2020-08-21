
exports.up = function(knex) {
    return knex.schema.createTable("pastedText", tbl => {
        tbl.increments("textId")
        tbl.text("text")
        tbl.text("token")
            .unique()
            .notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("pastedText")
};
