'use strict';

exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('users').insert([{
      first_name: 'Jon',
      last_name: 'Lester',
      image_url: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/28487.png&w=350&h=254',
      bio: 'Seasoned veteran starting pitcher for the Chicago Cubs'
    }, {
      first_name: 'Ben',
      last_name: 'Zobrist',
      image_url: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/28536.png&w=350&h=254',
      bio: 'Clutch 2nd baseman for the Chicago Cubs'
    }, {
      first_name: 'Dexter',
      last_name: 'Fowler',
      image_url: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/29252.png&w=350&h=254',
      bio: 'Baller Center fielder for the Chicago Cubs'
    }, {
      first_name: 'Anthony',
      last_name: 'Rizzo',
      image_url: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/30782.png&w=350&h=254',
      bio: '1st baseman for the Chicago Cubs ohh and in my free time before games I kick it with my homies at the Children\'s hospital.'
    }, {
      first_name: 'Kris',
      last_name: 'Bryant',
      image_url: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/33172.png&w=350&h=254',
      bio: 'No longer the Rookie, even though I was rookie of the year ;-)'
    }, {
      first_name: 'Jake',
      last_name: 'Arrieta',
      image_url: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/30145.png&w=350&h=254',
      bio: 'Starting Pitcher for the Chicago Cubs. Working on perfecting my cutter and I do a little pilates on the side.'
    }, {
      first_name: 'Javier',
      last_name: 'Báez',
      image_url: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32127.png&w=350&h=254',
      bio: 'HOLY COW - where did this guy come from!? Tripple A IOWA!'
    }, {
      first_name: 'Addison',
      last_name: 'Russell',
      image_url: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/32656.png&w=350&h=254',
      bio: 'Baby face Short Stop for the Chicago Cubs'
    }, ]),
  ])
}
