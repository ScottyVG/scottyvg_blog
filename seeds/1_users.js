exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').insert([{
      first_name: 'Elana',
      last_name: 'Kopelevich',
      image_url: 'http://www.iconshock.com/img_vista/IPHONE/communications/jpg/dog_icon.jpg',
      bio: 'Elana is cool.'
    }, {
      first_name: 'Craig',
      last_name: 'Quincy',
      image_url: 'https://d13yacurqjgara.cloudfront.net/users/9631/screenshots/837196/evagalesloot_skwirrol_icon_drb.jpg',
      bio: 'Craig is rad.'
    }, {
      first_name: 'Matt',
      last_name: 'Bouchard',
      image_url: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/cat-icon.png',
      bio: 'Matt is neat.'
    }, {
      first_name: 'James',
      last_name: 'Freeman',
      image_url: 'https://cdn2.iconfinder.com/data/icons/bird-icons/512/Bird_Icons_5-128.png',
      bio: 'James is smart.'
    }, ]),
  ])
}


// 'use strict';
//
// exports.seed = (knex, Promise) => {
//   return Promise.all([
//     knex('users').insert([{
//       first_name: 'Jon',
//       last_name: 'Lester',
//       avatar: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/28487.png&w=350&h=254',
//       bio: 'Seasoned veteran starting pitcher for the Chicago Cubs'
//     }, {
//       first_name: 'Ben',
//       last_name: 'Zobrist',
//       avatar: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/28536.png&w=350&h=254',
//       bio: 'Clutch 2nd baseman for the Chicago Cubs'
//     }, {
//       first_name: 'Dexter',
//       last_name: 'Fowler',
//       avatar: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/29252.png&w=350&h=254',
//       bio: 'Baller Center fielder for the Chicago Cubs'
//     }, {
//       first_name: 'Anthony',
//       last_name: 'Rizzo',
//       avatar: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/30782.png&w=350&h=254',
//       bio: '1st baseman for the Chicago Cubs ohh and in my free time before games I kick it with my homies at the Children\'s hospital.'
//     }, {
//       first_name: 'Kris',
//       last_name: 'Bryant',
//       avatar: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/33172.png&w=350&h=254',
//       bio: 'No longer the Rookie, even though I was rookie of the year ;-)'
//     }, {
//       first_name: 'Jake',
//       last_name: 'Arrieta',
//       avatar: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/30145.png&w=350&h=254',
//       bio: 'Starting Pitcher for the Chicago Cubs. Working on perfecting my cutter and I do a little pilates on the side.'
//     }, {
//       first_name: 'Javier',
//       last_name: 'Báez',
//       avatar: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32127.png&w=350&h=254',
//       bio: 'HOLY COW - where did this guy come from!? Tripple A IOWA!'
//     }, {
//       first_name: 'Addison',
//       last_name: 'Russell',
//       avatar: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32656.png&w=350&h=254',
//       bio: 'Baby face Short Stop for the Chicago Cubs'
//     }, ]),
//   ])
// }
