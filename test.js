// 'use strict';
//
// exports.up = (knex) => {
//   return knex.schema.createTable('users', (table) => {
//     table.increments();
//     table.string('first_name');
//     table.string('last_name');
//     table.string('image_url');
//     table.text('bio');
//     table.string('email').unique().notNullable();
//     table.specificType('hashed_password', 'char(60)').notNullable();
//     table.timestamps(true, true);
//   });
// };
//
// exports.down = (knex) => {
//   return knex.schema.dropTable('users');
// };


// 'use strict';
//
// exports.up = (knex) => {
//   return knex.schema.createTable('posts', (table) => {
//     table.increments()
//     table.string('title');
//     table.text('body');
//     table.string('image_url');
//     table.integer('user_id').unsigned().references('id').inTable('users');
//     table.timestamps(true, true);
//   })
// }
//
// exports.down = (knex) => {
//   return knex.schema.dropTable('posts');
// }


// 'use strict';
//
// exports.up = (knex) => {
//   return knex.schema.createTable('comments', (table) => {
//     table.increments()
//     table.string('body')
//     table.integer('user_id').unsigned().references('id').inTable('users');
//     table.integer('post_id')
//     table.timestamps(true, true);
//   })
// }
//
// exports.down = function(knex) {
//   return knex.schema.dropTable('comments');
// }
