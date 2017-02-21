var React = require('react');

var Tab = require("react-bootstrap/lib/Tab");
var Col = require("react-bootstrap/lib/Col");
var Row = require("react-bootstrap/lib/Row");


var NavItem = require("react-bootstrap/lib/NavItem");
var Nav = require("react-bootstrap/lib/Nav");
var Accordion = require('../subchapter/Accordion.js');

var Tabs = React.createClass({
    getInitialState: function () {
      return { data: {comments: []} };
    },

    loadCommentsFromServer: function () {
      var chapters = ['Problems and algorithms', 'Datastructures', 'Split and conquer', 'Ranking in linear time'];
      this.setState({
        data: chapters
      });
      console.log("mounted");
    },

    
    componentWillMount: function (){
      this.loadCommentsFromServer()
    },

    render: function () {
      if(this.state.data){
        var chaptersList = this.state.data.map(function (name, index){
          return <NavItem eventKey={'num' + index}>{name}</NavItem>;
        });
      }

      return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="num0">
          <Row className="clearfix">
            <Col sm={3}>
              <Nav bsStyle="pills" stacked>{chaptersList}</Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content animation>
                <Tab.Pane eventKey="num0" >
                  <Accordion />
                </Tab.Pane>
                <Tab.Pane eventKey="num1">
                  Tab 2 content
                </Tab.Pane>
                  <Tab.Pane eventKey="num2">
                  Tab 3 content
                </Tab.Pane>
                  <Tab.Pane eventKey="num3">
                  Tab 4 content
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )
    }
});

module.exports = Tabs;