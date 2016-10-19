'use strict'

// TODO: update seeds before seeding

exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('comment').del(),
    knex('post').del(),
    knex('users').del(),
  ])
}
