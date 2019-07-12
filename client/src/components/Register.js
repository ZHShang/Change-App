import React, { Component } from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap/';
import "../register.css";
import { ReCaptcha } from 'react-recaptcha-google';
import {Link} from 'react-router-dom';

class Register extends Component {
  render() {
    const {
      handleInputChange: handleChange,
      handleRegister,
      onLoadRecaptcha,
      verifyCallback,
      mainState: state,
    } = this.props;

    return (

      <div className="background" id="background">
        <Container fluid className="background" id="background">
          <Row className="loginform" id="loginform">
            <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicEmail">
                <Form.Control onChange = {handleChange} name="first_name" type="text" placeholder="First Name" />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Control onChange = {handleChange} name="last_name" type="text" placeholder="Last Name" />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control onChange = {handleChange} name="email" type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control onChange = {handleChange} name="password" type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control onChange = {handleChange} name="password_confirmation" type="password" placeholder="Confirm Password" />
              </Form.Group>
              <Button className="float-right loginbtn" variant="outline-dark" type="submit" disabled={state.disabled} pull-right>
                Register
              </Button>
              <p className="extra1">Have an account? <Link to="/login">Sign In</Link></p>
              <br/>
              <ReCaptcha
                ref={(el) => {this.captchaDemo = el;}}
                size="normal"
                render="explicit"
                sitekey="6LcbmKsUAAAAANoBjdDOA7UYZCMoqVEeSD8aIgxT"
                theme="light"
                onloadCallback={onLoadRecaptcha}
                verifyCallback={verifyCallback}
              />
            </Form>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;