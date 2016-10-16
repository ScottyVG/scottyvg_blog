'use strict';

exports.up = (knex) => {
  return knex.schema.createTable('posts', (table) => {
    table.increments()
    table.string('title')
    table.text('body')
    table.integer('user_id').unsigned().references('id').inTable('users')
    table.dateTime('created_at')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('posts')
}
