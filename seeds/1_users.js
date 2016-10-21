'use strict'

exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('users').insert([{
      username: 'scottyvg',
      password: 'toohot',
      fullName: 'Scott Van Gilder',
    }, {
      username: 'RizzKnows',
      password: 'asdf',
      fullName: 'Anthony Rizzo',
    }, {
      username: 'MVProokie',
      password: 'asdf',
      fullName: 'Kris Bryant',
    }, {
      username: 'JakeTheSnake',
      password: 'asdf',
      fullName: 'Jake Arrieta',
    }, ]),
  ])
}
