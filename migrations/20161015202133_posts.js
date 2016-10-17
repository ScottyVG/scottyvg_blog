exports.up = function(knex) {
  return knex.schema.createTable('posts', function(table) {
    table.increments()
    table.string('title')
    table.text('body')
    table.string('image_url')
    table.integer('user_id')
    table.timestamps()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('posts')
}
