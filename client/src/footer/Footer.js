import React from 'react';
import './Footer.css'

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
                 <li><a href="index.html">Home</a></li>
                 <li><a href="watches.html">Profile</a></li>
                 <li><a href="order.html">Contact</a></li>
                 <li><a href="about.html">Log out</a></li>
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
         <div>
         <h6 className="copyright"> © <a href="mailto:thayanat@stud.ntnu.no">Made with ♥ by Team Weebo</a> ツ</h6>
        </div>
    </div>
  </div>
        );
    }
});

export default Footer;
