// 'use strict'
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const knex = require('../db/knex');
// const auth = require('../middleware/auth');
// passport.serializeUser((user, done) => {
//   console.log('serializeUser fired', user);
//   knex('users')
//     .where('email', user.email)
//     .first()
//     .then((users) => {
//       delete users.hashedPassword;
//       done(null, users);
//     })
//     .catch((err) => {
//       done(null, false)
//     });
// });
// passport.deserializeUser((user, done) => {
//   console.log('deserializeUser fired');
//   knex('users')
//     .where('email', user.email)
//     .first()
//     .then((users) => {
//       delete users.hashedPassword;
//       done(null, users);
//     })
//     .catch((err) => {
//       done(null, false)
//     });
// });
// passport.use('local', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true
// }, (req, username, password, done) => {
//   // console.log('signup local-strat', req.body);
//   // console.log('signup local-strat email', req.body.email);
//   // console.log('signup local-strat password', req.body.password);
//   if (!req.body.email) {
//     return done(null, false, req.flash('message', 'Enter in an Email.'));
//   }
//   if (!req.body.password) {
//     return done(null, false, req.flash('message', 'Enter in a password'));
//   }
//   console.log(req.body);
//   knex('users')
//     .where('email', req.body.email)
//     .first()
//     .then((users) => {
//       if (!users) {
//         return done(null, false)
//       }
//       console.log(users);
//       if (auth.validPassword(req.body.password, users.hashedPassword)) {
//         delete users.hashedPassword;
//         var user = users
//         return done(null, user)
//       }
//     })
// }))
