var React = require('react');

var Tab = require("react-bootstrap/lib/Tab");
var Col = require("react-bootstrap/lib/Col");
var Row = require("react-bootstrap/lib/Row");
var NavItem = require("react-bootstrap/lib/NavItem");
var Nav = require("react-bootstrap/lib/Nav");
var Accordion = require('../subchapter/Accordion.js');

var Tabs = React.createClass({
    render: function () {
        return (
    <div bsClass='container'>
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    <Row className="clearfix">
      <Col sm={3}>
        <Nav bsStyle="pills" stacked>
          <NavItem eventKey="first">
            Problems and algorithms
          </NavItem>
          <NavItem eventKey="second">
            Datastructures
          </NavItem>
            <NavItem eventKey="third">
            Split and conquer
          </NavItem>
            <NavItem eventKey="fourth">
            Ranking in linear time
          </NavItem>
            <NavItem eventKey="fifth">
            Rooted trees
          </NavItem>
        </Nav>
      </Col>
      <Col sm={9}>
        <Tab.Content animation>
          <Tab.Pane eventKey="first" >
            <Accordion />
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            Tab 2 content
          </Tab.Pane>
            <Tab.Pane eventKey="third">
            Tab 3 content
          </Tab.Pane>
            <Tab.Pane eventKey="fourth">
            Tab 4 content
          </Tab.Pane>
            <Tab.Pane eventKey="fifth">
            Tab 5 content
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
            </div>
        )
    }
});

module.exports = Tabs;