var React = require('react')
var ReactBS = require('react-bootstrap')
var ButtonToolbar = ReactBS.ButtonToolbar
var ButtonGroup = ReactBS.ButtonGroup
var Button = ReactBS.Button
var Glyphicon = ReactBS.Glyphicon

var HelloApp = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})

React.render(
  <HelloApp>
    <ButtonToolbar>
      {/* Standard button */}
      <Button>Default</Button>
      {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
      <Button bsStyle="primary">Primary</Button>
      {/* Indicates a successful or positive action */}
      <Button bsStyle="success">Success</Button>
      {/* Contextual button for informational alert messages */}
      <Button bsStyle="info">Info</Button>
      {/* Indicates caution should be taken with this action */}
      <Button bsStyle="warning">Warning</Button>
      {/* Indicates a dangerous or potentially negative action */}
      <Button bsStyle="danger">Danger</Button>
      {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
      <Button bsStyle="link">Link</Button>
    </ButtonToolbar>

    <ButtonToolbar>
      <Button bsStyle="primary" bsSize="large">Large button</Button>
      <Button bsSize="large">Large button</Button>
    </ButtonToolbar>
    <ButtonToolbar>
      <Button bsStyle="primary">Default button</Button>
      <Button>Default button</Button>
    </ButtonToolbar>
    <ButtonToolbar>
      <Button bsStyle="primary" bsSize="small">Small button</Button>
      <Button bsSize="small">Small button</Button>
    </ButtonToolbar>
    <ButtonToolbar>
      <Button bsStyle="primary" bsSize="xsmall">Extra small button</Button>
      <Button bsSize="xsmall">Extra small button</Button>
    </ButtonToolbar>

    <ButtonToolbar>
      <ButtonGroup>
        <Button><Glyphicon glyph="align-left" /></Button>
        <Button><Glyphicon glyph="align-center" /></Button>
        <Button><Glyphicon glyph="align-right" /></Button>
        <Button><Glyphicon glyph="align-justify" /></Button>
      </ButtonGroup>
    </ButtonToolbar>
    <ButtonToolbar>
      <ButtonGroup>
        <Button bsSize="large"><Glyphicon glyph="star" /> Star</Button>
        <Button><Glyphicon glyph="star" /> Star</Button>
        <Button bsSize="small"><Glyphicon glyph="star" /> Star</Button>
        <Button bsSize="xsmall"><Glyphicon glyph="star" /> Star</Button>
      </ButtonGroup>
    </ButtonToolbar>
  </HelloApp>,
  document.getElementById("container")
)
