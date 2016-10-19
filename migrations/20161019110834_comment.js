'use strict'

exports.up = (knex, Promise) => {
  return knex.schema.createTable('comment', (table) => {
    table.increments()
    table.integer('user_id').references('id').inTable('user')
    table.integer('blog_id').references('id').inTable('blog')
    table.text('content')
    table.string('user_fullName')
    table.timestamps(null, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('comment')
}
