var React = require('react');
import {Accordion, PanelGroup, Panel, Button, Glyphicon, Modal} from 'react-bootstrap';
var SubChapterContent = require('./SubChapterContent');
import EditSubChaptersModal from './EditSubChaptersModal.js';
import Alert from 'react-s-alert';
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
        console.log(this.props.subject.ban_time);
        if(this.props.subject.ban_time == '0000-00-00 00:00:00'){
            var t = this.props.subject.ban_time.split(/[- :]/);
            console.log(t);
            var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
            console.log(d);
            this.setState({
                ban_time: d
            });
        }else{
            var d = new Date(this.props.subject.ban_time);
            console.log(d);
            this.setState({
                ban_time: d
            });
        }
    },

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

    openEditSubChaptersModal: function () {
        this.setState({ showEditSubChaptersModal: true });
    },

    closeEditSubChaptersModal: function () {
        this.setState({ showEditSubChaptersModal: false });
    },

    render: function () {
        if(this.state.subchapters){
            var subchaptersList = this.state.subchapters.map(function (s, idx){
                var theKey = this.props.chapId + 'subchap' + idx;
                var panelName = (<span>{s.sname}</span>);
                return (
                    <Panel
                      className="animated subChapterPanel"
                      header={panelName}
                      eventKey={theKey}
                      onSelect={this.handleSelect}>
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
                <h3 className="subChaptersHeading">
                    Subchapters
                    {this.props.auth.canEditChapters() &&
                        <Button className="editSubChaptersButton" onClick={() => this.openEditSubChaptersModal()}>
                            <Glyphicon glyph="glyphicon glyphicon-pencil"/> Edit
                        </Button>
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
