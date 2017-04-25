import React from 'react';
import { shallow } from 'enzyme';
import EditSubChaptersModal from './EditSubChaptersModal';

it('renders without crashing', () => {
    // <EditSubChaptersModal
    //     show={this.state.showEditSubChaptersModal}
    //     onHide={this.closeEditSubChaptersModal}
    //     subjectID={this.props.subject.subjectID}
    //     chapterID={this.props.chapter.chapterID}
    //     reloadSubChapters={this.loadSubChaptersFromServer}
    //     subchapters={this.state.subchapters} />

    const show = true;
    const onHide = function () {};
    const subjectID = "";
    const chapterID = "";
    const reloadSubChapters = function () {};
    const subchapters = [{}];

    shallow(<EditSubChaptersModal show={show}
                                  onHide={onHide}
                                  subjectID={subjectID}
                                  chapterID={chapterID}
                                  reloadSubChapters={reloadSubChapters}
                                  subchapters={subchapters} />);
});
