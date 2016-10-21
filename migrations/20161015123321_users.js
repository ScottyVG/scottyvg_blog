'use strict'

exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('username')
    table.string('password')
    table.boolean('admin')
    table.text('fullName')
    table.text('avatarURL')
    table.text('bio')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}