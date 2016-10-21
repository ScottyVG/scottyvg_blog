'use strict'

exports.up = (knex, Promise) => {
  return knex.schema.createTable('comments', (table) => {
    table.increments()
    table.integer('users_id').references('id').inTable('users')
    table.integer('blogs_id').references('id').inTable('blogs')
    table.text('content')
    table.string('users_fullName')
    table.timestamps(null, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('comments')
}
