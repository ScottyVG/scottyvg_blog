require('dotenv').load()

var environment = process.env.NODE_ENV || 'development'
var config = require('../knexfile.js')[environment]
var knex = require('knex')(config)

module.exports = knex


// 'use strict';
//
// // require('dotenv').load();
//
// const environment = process.env.NODE_ENV || 'development';
// const knexConfig = require('../knexfile')[environment];
// const knex = require('knex')(knexConfig);
//
// module.exports = knex;
