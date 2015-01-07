'use strict'

var React = require('react')
var ReactRouterBootstrap = require('react-router-bootstrap')
var { Button, Nav, Navbar, NavItem, Glyphicon } = require('react-bootstrap')
var { NavItemLink } = ReactRouterBootstrap

var HeaderNav = React.createClass({
  render: function () {
    return (
      <Navbar fixedTop={true}>
        <Nav>
          <Button componentClass="button" className="navbar-btn"><Glyphicon glyph="th-list" /></Button>
          <NavItemLink to="dashboard">Dashboard</NavItemLink>
        </Nav>
        <Nav right={true}>
          {/*<NavItemLink to="tickets"><Glyphicon glyph="calendar" />Tickets</NavItemLink>*/}
          <NavItemLink to="consumptions"><Glyphicon glyph="usd" />Consumptions</NavItemLink>
          <NavItemLink to="help"><Glyphicon glyph="question-sign" />Help</NavItemLink>
        </Nav>
      </Navbar>
    )
  }
})

module.exports = HeaderNav
