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
			chapters: []
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
		this.loadChaptersFromServer();
	},

	componentWillReceiveProps: function (nextProps) {
		if (nextProps.selectedCourse) {
			this.loadChaptersFromServer(nextProps.selectedCourse.subjectID);
		}
	},

	handleSelect: function (selectedKey){
		console.log(selectedKey);
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
				return (
					<Tab.Pane eventKey={'chap' + idx}>
						<Accordion subject={this.props.selectedCourse.subjectID} chapter={'chapAcc' + idx}/>
					</Tab.Pane>
				);
			}, this);
		}

		return (
			<div>

			<Tab.Container id="left-tabs-example" defaultActiveKey="chap0">
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
