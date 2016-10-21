'use strict'

exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('blogs').insert([{
      title: 'HOLY COW - That Baez Play tonight!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageURL: 'http://a.espncdn.com/combiner/i?img=%2Fmedia%2Fmotion%2F2016%2F1015%2Fdm_161015_MLB_One-Play_Cubs_Baez_steals_home%2Fdm_161015_MLB_One-Play_Cubs_Baez_steals_home.jpg&w=943&h=530&cquality=80',
      // users_id: 5,
    }, {
      title: 'Chapman & Rizzo - Enemies now become best friends',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageURL: 'http://sportsmockery.com/wp-content/uploads/2016/09/ap-cubs-reds-baseball.jpg',
      // users_id: 6,
    }, {
      title: 'Inside the Pitch: How to throw 100 mile an hour fastballs every time like Aroldis Chapman',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageURL: 'http://www.dailyherald.com/storyimage/DA/20160730/sports/160739886/AR/0/AR-160739886.jpg&updated=201607302152&MaxW=800&maxH=800&noborder',
      // users_id: 7,
    }, ]),
  ])
}
