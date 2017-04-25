import React from 'react';
import { shallow } from 'enzyme';
import EditChaptersModal from './EditChaptersModal';

it('renders without crashing', () => {
    const subjectID = "";
    const chapters = [{}];
    const reloadChapters = function (id) {

    }

    shallow(<EditChaptersModal subjectID={subjectID}
                               chapters={chapters}
                               reloadChapter={reloadChapters} />);
});
