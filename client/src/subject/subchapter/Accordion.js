var React = require('react');
import {Accordion, Panel, Row, Col, Grid} from 'react-bootstrap';
var YouTube = require('./YouTubePlayer.js');
var Upvote = require('./Upvote.js');
var SubChapterContent = require('./SubChapterContent');
import Client from '../../Client.js';

var AccordionBoot = React.createClass({
    getInitialState: function(){
        return {
            showComponent: false,
            subchapters: [],
            activePanel: 'none'
        };
    },
    loadSubChaptersFromServer: function (subjectID, chapterID) {
        Client.getSubChapters(subjectID, chapterID, (subchptrs) => {
			if (subchptrs) {
				this.setState({ subchapters: subchptrs });
			}
		});
    },
    componentWillMount: function (){
        this.loadSubChaptersFromServer(this.props.subject.subjectID, this.props.chapter.chapterID);
    },

    componentWillReceiveProps: function (nextProps) {
		if (nextProps.subject) {
			this.loadSubChaptersFromServer(nextProps.subject.subjectID, nextProps.chapter.chapterID);
		}
	},
    handleSelect: function(panel){
        if(this.state.activePanel != panel){
            this.setState({
                activePanel: panel
            });
        }else{
            this.setState({
                activePanel: ''
            });
        }
    },
    render: function () {
        if(this.state.subchapters){
            var subchaptersList = this.state.subchapters.map(function (s, idx){
              var theKey = this.props.chapId + 'subchap' + idx;
              return (<Panel header={s.sname}
                        eventKey={theKey}
                        onSelect={this.handleSelect}>
                            <SubChapterContent
                                subject={this.props.subject}
                                chapter={this.props.chapter}
                                subchapter={this.state.subchapters[idx]}
                                needActive={theKey}
                                activePanel={this.state.activePanel} 
                                userID={this.props.userID}/>
                      </Panel>
                      
                    );
            }, this);
        }
        return (
          <Accordion>
            {subchaptersList}
          </Accordion>)
    }
});


module.exports = AccordionBoot;
