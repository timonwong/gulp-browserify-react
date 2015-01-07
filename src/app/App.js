'use strict'

var React = require('react')
var HeaderNav = require('./component/HeaderNav')
var { RouteHandler } = require('react-router')

var App = React.createClass({
  render() {
    return (
      <div className="viewport">
        <header className="header">
          <HeaderNav />
        </header>
        <main className="content" role="main">
          <RouteHandler />
        </main>
      </div>
    )
  }
})

module.exports = App
