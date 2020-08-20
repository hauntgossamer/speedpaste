
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("pastedText").truncate()
    .then(function () {
      // Inserts seed entries
      return knex("pastedText").insert([
        {token: "testtoken1", text: "test text 1"},
        {token: "testtoken2", text: "test text 2"},
        {token: "testtoken3", text: "test text 3"}
      ]);
    });
};
