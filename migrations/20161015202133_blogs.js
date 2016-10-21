'use strict'

exports.up = (knex, Promise) => {
  return knex.schema.createTable('blogs', (table) => {
    table.increments()
    table.string('title')
    table.text('content')
    table.string('imageURL')
    table.integer('users_id').references('id').inTable('users')
    table.timestamps(null, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('blogs')
}
