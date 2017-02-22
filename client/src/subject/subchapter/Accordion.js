var React = require('react');
import {Accordion, Panel, Row, Col, Grid} from 'react-bootstrap';
var YouTube = require('./YouTubePlayer.js');
var Upvote = require('./Upvote.js');

var AccordionBoot = React.createClass({
    render: function () {
        return (
          <Accordion>
            <Panel header="Defining problem, instance and problem size" eventKey="1">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </Panel>
            <Panel header="Loop invariants and natural induction" eventKey="2">
                <Grid>
                    <Row>
                        <Col xs={4} md={2}>
                            <YouTube id='6qpudAhYhpc' />{this.props.subject}{this.props.chapter}
                        </Col>
                        <Col xs={1} md={1} ><Upvote></Upvote></Col>
                    </Row>        
                    <Row>
                        <Col xs={4} md={2}>
                            <YouTube id='EZ7OpCAC98g' />
                        </Col>
                        <Col xs={1} md={1} ><Upvote></Upvote></Col>
                    </Row>
                </Grid>
            </Panel>
            <Panel header="Incremental design" eventKey="3">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </Panel>
          </Accordion>)
    }
});


module.exports = AccordionBoot;