import React, { Component } from 'react';
import {Form, FormCheck, Container, Row, Col, OverlayTrigger, Button, Popover} from 'react-bootstrap';
import PlaidLink from './PlaidLink';
import  '../charitysettings.css'


class Charity extends Component {

  render(){
    const popover = (
      <Popover id="popover-basic" title="Voting">
        Our voting algorithm is designed to ensure that if <strong>YOU</strong> are passionate about a particular charity, we make sure that your vote counts against some of the more popular charities.<br/><br/>
        Each member gets five votes, you can vote for a single charity up to five times, or spread your votes around. The more votes given to a single charity, the “more” those votes count, (ie: if you use all 5 votes for a single charity it’ll count as 25 votes towards the Collective)
      </Popover>
    );
    const {
      mainState: state,
      onVoteChanged,
      handleOnExit,
      handleOnSuccess,
      handleVoteSelection,
      getTransactions,
    } = this.props

    return (
      <Container fluid className="votes">
      { !state.plaidConnected ? (
      <Row className="plaidStyling">
       <PlaidLink
          clientName="Change Collective"
          env="development"
          countryCodes={['CA']}
          product={["auth", "transactions"]}
          publicKey="2ae89ce59b9f812475f71e0d9aba50"
          onExit={handleOnExit}
          onSuccess={handleOnSuccess}>
          Open Link and connect your bank!
        </PlaidLink>
        </Row> ):(
        <Form>
        {state.transactions.length === 0 ? (
        <div>
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <Button variant="outline-dark">How this works</Button>
          </OverlayTrigger>
          <Row>
            {['radio'].map(type => (
                <div key={`default-${type}`} className="mb-5">
                  <label className="voteSection"> Vote 1 </label> <br />
                     <Form.Check inline label="Daily Food Bank" type={type}
                      id={`inline-${type}-5`}  value="0" name="vote1" onChange={onVoteChanged}/>
                     <Form.Check inline label="Habitat for Humanity" type={type} id={`inline-${type}-5`} value="1" name="vote1" onChange={onVoteChanged}/>
                     <Form.Check inline label="Parkinson Canada" type={type} id={`inline-${type}-5`} value="2" name="vote1" onChange={onVoteChanged}/>
                     <Form.Check inline label="Princess Margaret Hospital" type={type} id={`inline-${type}-5`} value="3" name="vote1" onChange={onVoteChanged}/>
                    <Form.Check inline label="SickKids Hospital" type={type} id={`inline-${type}-5`} value="4" name="vote1" onChange={onVoteChanged}/>
                </div>
              ))}
          </Row>
          <Row>
            {['radio'].map(type => (
              <div key={`default-${type}`} className="mb-5">
                <label className="voteSection"> Vote 2 </label> <br />
                   <Form.Check inline label="Daily Food Bank" type={type}
                    id={`inline-${type}-5`} value="0" name="vote2" onChange={onVoteChanged}/>
                   <Form.Check inline label="Habitat for Humanity" type={type} id={`inline-${type}-5`} value="1" name="vote2" onChange={onVoteChanged}/>
                   <Form.Check inline label="Parkinson Canada" type={type} id={`inline-${type}-5`} value="2" name="vote2" onChange={onVoteChanged}/>
                   <Form.Check inline label="Princess Margaret Hospital" type={type} id={`inline-${type}-5`} value="3" name="vote2" onChange={onVoteChanged}/>
                  <Form.Check inline label="SickKids Hospital" type={type} id={`inline-${type}-5`} value="4" name="vote2" onChange={onVoteChanged}/>
              </div>
            ))}
          </Row>
          <Row>
            {['radio'].map(type => (
              <div key={`default-${type}`} className="mb-5">
                <label className="voteSection"> Vote 3 </label> <br />
                   <Form.Check inline label="Daily Food Bank" type={type}
                    id={`inline-${type}-5`} value="0" name="vote3" onChange={onVoteChanged}/>
                   <Form.Check inline label="Habitat for Humanity" type={type} id={`inline-${type}-5`} value="1" name="vote3" onChange={onVoteChanged}/>
                   <Form.Check inline label="Parkinson Canada" type={type} id={`inline-${type}-5`} value="2" name="vote3" onChange={onVoteChanged}/>
                   <Form.Check inline label="Princess Margaret Hospital" type={type} id={`inline-${type}-5`} value="3" name="vote3" onChange={onVoteChanged}/>
                  <Form.Check inline label="SickKids Hospital" type={type} id={`inline-${type}-5`} value="4" name="vote3" onChange={onVoteChanged}/>
              </div>
            ))}
          </Row>
          <Row>
            {['radio'].map(type => (
              <div key={`default-${type}`} className="mb-5">
                <label className="voteSection"> Vote 4 </label> <br />
                   <Form.Check inline label="Daily Food Bank" type={type}
                    id={`inline-${type}-5`} value="0" name="vote4" onChange={onVoteChanged}/>
                   <Form.Check inline label="Habitat for Humanity" type={type} id={`inline-${type}-5`} value="1" name="vote4" onChange={onVoteChanged}/>
                   <Form.Check inline label="Parkinson Canada" type={type} id={`inline-${type}-5`} value="2" name="vote4" onChange={onVoteChanged}/>
                   <Form.Check inline label="Princess Margaret Hospital" type={type} id={`inline-${type}-5`} value="3" name="vote4" onChange={onVoteChanged}/>
                  <Form.Check inline label="SickKids Hospital" type={type} id={`inline-${type}-5`} value="4" name="vote4" onChange={onVoteChanged}/>
              </div>
            ))}
          </Row>
          <Row>
            {['radio'].map(type => (
              <div key={`default-${type}`} className="mb-5">
                <label className="voteSection"> Vote 5 </label> <br />
                   <Form.Check inline label="Daily Food Bank" type={type}
                    id={`inline-${type}-5`} value="0" name="vote5" onChange={onVoteChanged}/>
                   <Form.Check inline label="Habitat for Humanity" type={type} id={`inline-${type}-5`} value="1" name="vote5" onChange={onVoteChanged}/>
                   <Form.Check inline label="Parkinson Canada" type={type} id={`inline-${type}-5`} value="2" name="vote5" onChange={onVoteChanged}/>
                   <Form.Check inline label="Princess Margaret Hospital" type={type} id={`inline-${type}-5`} value="3" name="vote5" onChange={onVoteChanged}/>
                  <Form.Check inline label="SickKids Hospital" type={type} id={`inline-${type}-5`} value="4" name="vote5" onChange={onVoteChanged}/>
              </div>
              ))}
          </Row>
          <form onSubmit={getTransactions} >
            <button className='mr-1 btn btn-outline-dark'>Submit Vote</button>
          </form>
        </div>
          ):(
        <form onSubmit={handleVoteSelection} >
            <h5>Your votes are now saved</h5>
          <button type="submit" className='mr-1 btn btn-outline-dark'>Proceed to Dashboard</button>
        </form>
            )}
        </Form>

      )}
      </Container>
    )
  }
}

export default Charity;