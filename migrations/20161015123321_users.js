'use strict'

exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('username')
    table.string('password')
    table.text('fullName')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}
