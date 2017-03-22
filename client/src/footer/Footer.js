import React from 'react';
import './Footer.css'
import {Link} from 'react-router';

var style = {
    backgroundColor: "#3c3c3c",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "static",
    left: "0",
    bottom: "0",
    height: "96px",
    width: "100%",
    marginTop: "300px",
};

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

const Footer = React.createClass({
    render: function() {
        return (
      <div className="footerFoot">
        <div style={phantom}/>
            <div style={style}>
            <div className="sidekart">
             <ul className="li_sidekart">
                 <li><Link to="/home">Home</Link></li>
                 <li><Link to="/profile">Profile</Link></li>
                 <li><Link to="/contact">Contact</Link></li>
                 <li onClick={this.props.auth.logout.bind(this)}>Log out</li>
             </ul>
         </div>
         <div className="sosial">
             <ul className="li_sosialknapper">
                 <li>
                     <a href="https://www.facebook.com/Weebo-774288392725196/"><img src={"https://c866088.ssl.cf3.rackcdn.com/assets/facebook30x30.png"}/></a>
                 </li>
                 <li>
                     <a href="https://twitter.com/weeboteam"><img src="https://c866088.ssl.cf3.rackcdn.com/assets/twitter30x30.png"/></a>
                 </li>
             </ul>
         </div>
    </div>
  </div>
        );
    }
});

export default Footer;
