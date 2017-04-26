/*  Written by Sølve Bø Hunvik, Roman Bachmann
    The component above the video and discussion content that adds the Bootstrap accordion to the website below chapters
*/

var React = require('react');
import {Accordion, Panel, Button, Glyphicon} from 'react-bootstrap';
var SubChapterContent = require('./SubChapterContent');
import EditSubChaptersModal from './EditSubChaptersModal.js';
import Client from '../../Client.js';
import './Accordion.css';

var AccordionBoot = React.createClass({
    getInitialState: function(){
        return {
            showComponent: false,
            subchapters: [],
            activePanel: 'none',
            ban_time: new Date(),
            showEditSubChaptersModal: false
        };
    },

    loadSubChaptersFromServer: function (subjectID, chapterID) {
        Client.getSubChapters(subjectID, chapterID, (subchptrs) => {
			if (subchptrs) {
				this.setState({ subchapters: subchptrs });
			}
		})
    },

    componentWillMount: function () {
        this.loadSubChaptersFromServer(this.props.subject.subjectID, this.props.chapter.chapterID);
        this.handleDate();
    },

    componentWillReceiveProps: function (nextProps) {
		if (nextProps.subject) {
			this.loadSubChaptersFromServer(nextProps.subject.subjectID, nextProps.chapter.chapterID);
            this.handleDate();
        }
	},
    handleDate: function () {
    //This function could have been placed anywhere,
    //but it formats the SQL date format to the JavaScript date format
        if(this.props.subject.ban_time === '0000-00-00 00:00:00'){
            var t = this.props.subject.ban_time.split(/[- :]/);
            var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
            this.setState({
                ban_time: d
            });
        }else{
            d = new Date(this.props.subject.ban_time);
            this.setState({
                ban_time: d
            });
        }
    },
    //Logic to only render content from selected panel
    handleSelect: function (panel) {
        if(this.state.activePanel !== panel){
            this.setState({
                activePanel: panel
            });
        }else{
            this.setState({
                activePanel: ''
            });
        }
    },
    //Functions to edit the subchapters
    openEditSubChaptersModal: function () {
        this.setState({ showEditSubChaptersModal: true });
    },

    closeEditSubChaptersModal: function () {
        this.setState({ showEditSubChaptersModal: false });
    },

    render: function () {
        if(this.state.subchapters){
            var subchaptersList = this.state.subchapters.map(function (s, idx){
                //Logic for which panel is active
                var theKey = this.props.chapId + 'subchap' + idx;
                var panelName = (<span>{s.sname}</span>);
                return (
                    <Panel
                      className="animated subChapterPanel"
                      header={panelName}
                      eventKey={theKey}
                      onSelect={this.handleSelect}
                      key={'panelKeyIdx' + idx}>
                          <SubChapterContent
                              subject={this.props.subject}
                              chapter={this.props.chapter}
                              subchapter={this.state.subchapters[idx]}
                              needActive={theKey}
                              activePanel={this.state.activePanel}
                              userID={this.props.userID}
                              auth={this.props.auth}
                              bantime={this.state.ban_time}
                              profile={this.props.profile}/>
                     </Panel>
                );
            }, this);
        }

        return (
            <div>
                <h3 className="ChapterHeading">
                    Subchapters
                    {this.props.auth.canEditChapters() &&
                        <span className="editChaptersButtonSep">
                        <Button className="editSubChaptersButton" onClick={() => this.openEditSubChaptersModal()}>
                            <Glyphicon glyph="glyphicon glyphicon-pencil"/> Edit
                        </Button>
                        </span>
                    }
                </h3>


                <Accordion>
                    {subchaptersList}
                </Accordion>

                <EditSubChaptersModal
                    show={this.state.showEditSubChaptersModal}
                    onHide={this.closeEditSubChaptersModal}
                    subjectID={this.props.subject.subjectID}
                    chapterID={this.props.chapter.chapterID}
                    reloadSubChapters={this.loadSubChaptersFromServer}
                    subchapters={this.state.subchapters} />
            </div>
        )
    }
});


module.exports = AccordionBoot;
