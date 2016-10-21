'use strict'

exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('comments').insert([{
      // users_id: 5,
      // blogs_id: 1,
      content: 'Go Cubs Go',
    }, {
      // users_id: 6,
      // blogs_id: 3,
      content: 'Fly the W',
    }, {
      // users_id: 7,
      // blogs_id: 1,
      content: 'Holy Cow',
    }, {
      // users_id: 8,
      // blogs_id: 2,
      content: 'Go Cubbies!',
    }, ]),
  ])
}
