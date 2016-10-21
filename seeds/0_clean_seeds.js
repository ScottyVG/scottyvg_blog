'use strict'

exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('comments').del(),
    knex('blogs').del(),
    knex('users').del(),
  ])
}
