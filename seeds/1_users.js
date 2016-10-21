'use strict'

exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('users').insert([{
      username: 'scottyvg',
      password: 'toohot',
      admin: true,
      fullName: 'Scott Van Gilder',
      avatarURL: 'http://scottvangilder.com/images/scottvangilder.jpg',
      bio: 'Kick Ass Web Developer',
    }, {
      username: 'RizzKnows',
      password: 'asdf',
      admin: false,
      fullName: 'Anthony Rizzo',
      avatarURL: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/30782.png&w=350&h=254',
      bio: '1st baseman for the Chicago Cubs ohh and in my free time before games I kick it with my homies at the Children\'s hospital.',
    }, {
      username: 'MVProokie',
      password: 'asdf',
      admin: false,
      fullName: 'Kris Bryant',
      avatarURL: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/33172.png&w=350&h=254',
      bio: 'No longer the Rookie, even though I was rookie of the year ;-)',
    }, {
      username: 'Cutter',
      password: 'asdf',
      admin: false,
      fullName: 'Jake Arrieta',
      avatarURL: 'http://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/30145.png&w=350&h=254',
      bio: 'Starting Pitcher for the Chicago Cubs. Working on perfecting my cutter and I do a little pilates on the side.',
    }, ]),
  ])
}
