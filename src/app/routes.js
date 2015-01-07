'use strict'

var React = require('react')
var { Route, DefaultRoute } = require('react-router')
var App = require('./App')
var DashboardPage = require('./pages/DashboardPage')
var HelpPage = require('./pages/HelpPage')
var ConsumptionsPage = require('./pages/ConsumptionsPage')

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute name="dashboard" handler={DashboardPage} />
    <Route name="help" handler={HelpPage} />
    <Route name="consumptions" handler={ConsumptionsPage} />
  </Route>
)

module.exports = routes
