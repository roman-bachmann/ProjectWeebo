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
        data: chapters,
        subject: 'tdt4145'
      });
      console.log("mounted");
    },
    
    componentWillMount: function (){
      this.loadCommentsFromServer()
    },
    handleSelect: function (selectedKey){
      console.log(selectedKey);
    },

    render: function () {
      if(this.state.data){
        var chaptersList = this.state.data.map(function (name, index){
          return <NavItem 
                    eventKey={'chap' + index} 
                    onSelect={this.handleSelect}>
                    {name}
                  </NavItem>;
        }, this);
        var tabPanes = this.state.data.map(function (name, index){
          return <Tab.Pane 
                  eventKey={'chap' + index}>
                    <Accordion subject={this.state.subject} 
                    chapter={'chap' + index}/>
                  </Tab.Pane>;
        }, this);
      }
      return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="chap0">
          <Row className="clearfix">
            <Col sm={3}>
              <Nav bsStyle="pills" stacked>{chaptersList}</Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content animation>
                {tabPanes}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )
    }
});

module.exports = Tabs;