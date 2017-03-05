var React = require('react');

const YouTube = ({ id }) => (

    <div className="youtube-wrapper">
        <div className="youtube">
            <iframe
                className="youtube-frame"
                width="100%"
                height="300"
                src={`https://www.youtube.com/embed/${id}?autoplay=0`}
                allowFullScreen
            />
        </div>
    </div>

);

module.exports = YouTube;