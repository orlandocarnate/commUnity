//this will be the landing page

import React, { Component } from "react";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
import './Home.css';
import logo from './logo1.png';
import axios from "axios";
import Carousel from "../../components/Carousel/carousel";
import Navbar from "../../components/Navbar";
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';


class Home extends Component {
    state = {
        loggedIn: false,
        username: undefined,
        roomId: undefined,
        userType: undefined,
    }

    componentDidMount() {
        console.log("GLOBAL: ", this.props.globalUsername);
        axios.post("/auth/local/protected").then(res => {
            console.log("AUTH RESPONSE: ", res.data.username)
            if (res.status === 200) {
                this.setState({
                    loggedIn: true,
                    username: res.data.username,
                    roomId: res.data.roomId,
                    userType: res.data.userType
                });
                this.props.globalUpdateUsername(this.state.username);
                this.props.globalUpdateVolRmId(this.state.roomId);
                this.props.globalUpdateUserType(this.state.userType);
            } 

        }).catch(err =>{
            console.log(err)
            this.setState({
                loggedIn:false
            })
            window.location.assign("/");
        })
   
    }
    handleLogout() {
        axios.get("/api/logout")
            .then((res) => {
                window.location.assign("/")
            })
    }
    render() {
        if(this.state.loggedIn)
        {
            return (
            <div className="homeComponent">
                <Container className="container">
                    <Row className="row justify-content-center">
                        <Col size="md-12" align="center">
                            <Carousel />
                        </Col>
                    </Row>
                    <Row className="row justify-content-center pt-2"> 
                        <Col size="md-6" align="center">
                            <img className="homeLogo" src={logo} />
                            <h1 className="homeHeader">Comm<span className="font-weight-bold">Unity</span></h1>
                            <h2>
                                <FormattedMessage id="homepage.home-welcome"
                                        defaultMessage="Welcoming You Home, { name }!"
                                        values = {{ name: this.state.username}} />
                            </h2>
                            <p>
                            <FormattedHTMLMessage id="homepage.happymsg"
                                    defaultMessage="We're so happy to have you!<br />
                                    Let's Get Started!<br />
                                    Click on services to navigate to nearby service centers.
                                    Or, click on connect to meet local families!" />
                            </p>
                        </Col>
                    </Row>
                    <Row className="row justify-content-center">
                        <Col size='sm-4'>
                            <div className="text-center text-light pt-3">
                            <FormattedMessage id="homepage.notyou1"
                                    defaultMessage="Not you?" />
                            {" "}<a href="#" onClick={this.handleLogout}>
                            <FormattedMessage id="homepage.notyou2"
                                    defaultMessage="Logout Now!" />
                            {" "}<i class="fas fa-user-minus"></i></a></div>
                        </Col>
                    </Row>
                    
                </Container>
                <Navbar />
            </div>
            )
        }
        else   
            return (
                <div></div>
            )
    }
}

export default Home;