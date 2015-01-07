'use strict'

var { create: createRouter, HistoryLocation, HashLocation } = require('react-router')
var routes = require('./routes.js')

var router = createRouter({
  //location: process.env.NODE_ENV === 'production' ? HashLocation : HistoryLocation,
  location: HashLocation,
  routes: routes
})

module.exports = router
