'use strict'

exports.up = (knex, Promise) => {
  return knex.schema.createTable('blog', (table) => {
    table.increments()
    table.string('title')
    table.text('content')
    table.integer('user_id').references('id').inTable('user')
    table.string('user_fullName')
    table.text('snippet')
    table.string('imageURL')
    table.timestamps(null, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('blog')
}
