'use strict'

exports.up = (knex, Promise) => {
  return knex.schema.createTable('user', (table) => {
    table.increments()
    table.string('username')
    table.string('password')
    table.boolean('admin')
    table.text('fullName')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('user')
}
