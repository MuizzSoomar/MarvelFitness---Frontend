import React, { Component } from "react";
import ListService from "../service/ListService";
import "../styles/Profile.css";
import ListUserVisitsComponent from "../component/ListUserVisitsComponent.jsx";
import Col from "react-bootstrap/lib/Col";
import Alert from "react-bootstrap/lib/Alert";
import Row from "react-bootstrap/lib/Row";
import Redirect from "react-router-dom/Redirect";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoffee, faEdit} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/lib/Modal";
import Form from "react-bootstrap/lib/Form";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import Button from "react-bootstrap/lib/Button";
import { connect } from 'react-redux'

const TEST_CUSTOMER_ID = 7;

// export default
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.refreshCustomer = this.refreshCustomer.bind(this);
    this.state = {
      visitList: [],
      redirect: false,
    };
  }


  componentDidMount() {
    this.refreshCustomer(this.props.user.id);
    this.refreshVisits();
  }

  refreshVisits() {
    ListService.getAllVisits().then(response => {
      this.refreshCustomer(this.props.user.id);
    });
  }

  refreshCustomer(id) {
    ListService.getCustomerById(id).then(response => {
      this.setState(() => {
        return {
          user: response.data
        };
      });
    });
  }

  handleRewardsClick = () => {
    this.setState(() => {
      return {
        redirect: true
      };
    });
  };

  render() {
    if (this.state.redirect) {
      // ********uncomment following lines when the customer profile page is ready*******
      let link = `/rewards/${this.props.user.id}`;
      return <Redirect push to={link} />;
    }
    return (
      <div className="parent">
        <Row>
          <Col sm={6} lg={8} />{" "}
          <Col sm={6} lg={4}>
            <Alert
              variant="warning"
              onClick={this.handleRewardsClick}
              className="reward"
            >
              {this.props.user.name}'s Rewards Balance: $
              {this.props.user.rewards}
            </Alert>
          </Col>
        </Row>

        <div className="firstRow">
          <div className="columnOne">
            <h2>Profile</h2>
            <div className="row">
              <Col sm={6} lg={4}><label>Name:</label></Col>
              <Col sm={6} lg={8}><div className="entry">{this.props.user.name}</div></Col>
            </div>
            <div className="row">
              <Col sm={6} lg={4}><label>ID Number:</label></Col>
              <Col sm={6} lg={8}><div className="entry">{this.props.user.id}</div></Col>
            </div>
            <div className="row">
              <Col sm={6} lg={4}><label>Email:</label></Col>
              <Col sm={6} lg={8}><div className="entry">{this.props.user.username}</div></Col>
            </div>
            <div className="row">
              <Col sm={6} lg={4}><label>Phone Number:</label></Col>
              <Col sm={6} lg={8}><div className="entry">{this.props.user.phone}</div></Col>
            </div>
            <div className="row">
              <Col sm={6} lg={4}><label>Address:</label></Col>
              <Col sm={6} lg={8}><div className="entry">
                {this.props.user.street_one}
                {""} {this.props.user.street_two}
                {""} {this.props.user.city}
                {""} {this.props.user.st}
                {""} {this.props.user.zip}
              </div></Col>
            </div>
          </div>
          <div className="columnTwo">
            <Col sm={7} lg={9} />{" "}
            <Col sm={7} lg={5}>
            </Col>
          </div>
        </div>

        <div className="secondRow">
          <div className="secondRowHeader">
            <ListUserVisitsComponent customer={this.props.user}></ListUserVisitsComponent>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps)(UserProfile);
