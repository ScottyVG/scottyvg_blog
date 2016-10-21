'use strict'

exports.up = (knex, Promise) => {
  return knex.schema.createTable('blogs', (table) => {
    table.increments()
    table.string('title')
    table.text('content')
    table.integer('users_id').references('id').inTable('users')
    table.string('users_fullName')
    table.text('snippet')
    table.string('imageURL')
    table.timestamps(null, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('blogs')
}
