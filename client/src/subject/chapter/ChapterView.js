var React = require('react');

var Tab = require("react-bootstrap/lib/Tab");
var Col = require("react-bootstrap/lib/Col");
var Row = require("react-bootstrap/lib/Row");

var NavItem = require("react-bootstrap/lib/NavItem");
var Nav = require("react-bootstrap/lib/Nav");
var Accordion = require('../subchapter/Accordion.js');

import Client from '../../Client.js';

var Tabs = React.createClass({
	getInitialState: function () {
		return {
			chapters: [],
      activeTab: 'none'
		};
	},

	loadChaptersFromServer: function (subjectID) {
		Client.getChaptersForSubject(subjectID, (chptrs) => {
			if (chptrs) {
				this.setState({ chapters: chptrs });
			}
		});
	},

	componentWillMount: function () {
		this.loadChaptersFromServer(this.props.selectedCourse.subjectID);
	},

	componentWillReceiveProps: function (nextProps) {
		if (nextProps.selectedCourse) {
			this.loadChaptersFromServer(nextProps.selectedCourse.subjectID);
		}
	},

	handleSelect: function (tab){
		this.setState({
            activeTab: tab
    });
	},

	render: function () {
		if(this.state.chapters){
			var chaptersList = this.state.chapters.map(function (c, idx){
				return (<NavItem
							eventKey={'chap' + idx}
							onSelect={this.handleSelect}>
							{c.cname}
						</NavItem>);
			}, this);
			var tabPanes = this.state.chapters.map(function (c, idx){
				var theKey = 'chap' + idx;
        return (
					<Tab.Pane eventKey={theKey}>
						{this.state.activeTab === theKey ? 
            <Accordion
							subject={this.props.selectedCourse}
							chapter={this.state.chapters[idx]}
              chapId={'chap' + idx}
              />
              :null}
					</Tab.Pane>
				);
			}, this);
		}

		return (
			<div>

			<Tab.Container id="left-tabs-example" >
				<Row className="clearfix">
					<Col sm={3}>
						<h1>{this.props.selectedCourse.subjectID}</h1>
						<Nav bsStyle="pills" stacked>
							{chaptersList}
						</Nav>
					</Col>
					<Col sm={9}>
						<Tab.Content animation>
							{tabPanes}
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
			</div>
		)
	}
});

module.exports = Tabs;
