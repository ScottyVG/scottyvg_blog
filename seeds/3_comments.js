exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('comments').insert([{
      body: 'Cats are better than dogs.',
      post_id: 1,
      user_id: 1
    }, {
      body: 'Dogs are better than cats.',
      post_id: 3,
      user_id: 1
    }, {
      body: 'Birds are better than dogs.',
      post_id: 1,
      user_id: 4
    }, {
      body: 'Cats are better than birds.',
      post_id: 4,
      user_id: 3
    }, {
      body: 'Birds are better than dogs.',
      post_id: 1,
      user_id: 4
    }, {
      body: 'Squirrels are better than dogs.',
      post_id: 1,
      user_id: 2
    }, {
      body: 'Squirrels are better than cats.',
      post_id: 3,
      user_id: 2
    }, {
      body: 'Squirrels are better than birds.',
      post_id: 4,
      user_id: 2
    }, {
      body: 'Birds are better than squirrels.',
      post_id: 3,
      user_id: 4
    }, ]),
  ])
}


// exports.seed = function(knex, Promise) {
//   return Promise.all([
//     knex('comments').insert([{
//       body: 'Cubs are better than the Dodgers.',
//       post_id: 1,
//       user_id: 1
//     }, {
//       body: 'Cubs are better than the Dodgers.',
//       post_id: 3,
//       user_id: 1
//     }, {
//       body: 'Cubs are better than the Dodgers.',
//       post_id: 1,
//       user_id: 4
//     }, {
//       body: 'Cubs are better than the Dodgers.',
//       post_id: 4,
//       user_id: 3
//     }, {
//       body: 'Cubs are better than the Dodgers.',
//       post_id: 1,
//       user_id: 4
//     }, {
//       body: 'Cubs are better than the Dodgers.',
//       post_id: 1,
//       user_id: 2
//     }, {
//       body: 'Cubs are better than the Dodgers.',
//       post_id: 3,
//       user_id: 2
//     }, {
//       body: 'Cubs are better than the Dodgers.',
//       post_id: 4,
//       user_id: 2
//     }, {
//       body: 'Cubs are better than the Dodgers.',
//       post_id: 3,
//       user_id: 4
//     }, ]),
//   ])
// }
