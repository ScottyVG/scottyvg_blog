exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('comment').del(),
    knex('post').del(),
    knex('users').del(),
  ])
}
