var React = require('react');
var Upvote = require('./Upvote.js');
import './YouTubePlayer.css';

const YouTube = ({ id }) => (

    <div className="youtube-wrapper">
        <ul className="ulul">
            {/*<div className="youtube">*/}
            <li >
                <iframe
                    className="youtube-frame"
                    
                    src={`https://www.youtube.com/embed/${id}?autoplay=0`}
                    allowFullScreen
                />
            </li>
            {/*</div>
            <div className="upWrap">*/}<li ><Upvote ></Upvote></li>{/*</div>*/}
        </ul>
    </div>

);

module.exports = YouTube;