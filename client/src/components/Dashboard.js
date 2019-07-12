import React, { Component } from 'react';
import { Container, Row, Col, Accordion, Table, Card, Badge } from 'react-bootstrap';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import '../dashboard.css'

const goalCompleted = (goals) => {
  return goals.map( goal =>
    <tr>
      <td>{goal.objective}</td>
      <td>{goal.cost}</td>
      <td>{ goal.completed === true ?<Badge variant="success">Success</Badge> :
      null }</td>
    </tr>
  )
}

class Dashboard extends Component {
  componentDidMount() {
    this.props.getDashboardInfo()
  }
  render() {
    const {
      user_votes,
      mainState: state,
    } = this.props

    const i1 = state.user_votes[0]
    const i2 = state.user_votes[1]
    const i3 = state.user_votes[2]
    const i4 = state.user_votes[3]
    const i5 = state.user_votes[4]

    const b1 = state.collective_votes[0]
    const b2 = state.collective_votes[1]
    const b3 = state.collective_votes[2]
    const b4 = state.collective_votes[3]
    const b5 = state.collective_votes[4]

    const total = b1+b2+b3+b4+b5

    const a1 = (b1/total) * 100
    const a2 = (b2/total) * 100
    const a3 = (b3/total) * 100
    const a4 = (b4/total) * 100
    const a5 = (b5/total) * 100

    const itotal = i1+i2+i3+i4+i5

    const v1 = (i1/itotal) * 100
    const v2 = (i2/itotal) * 100
    const v3 = (i3/itotal) * 100
    const v4 = (i4/itotal) * 100
    const v5 = (i5/itotal) * 100

    console.log(this.props.mainState.transactions)
    const trans = this.props.mainState.transactions
    return(
        <Container fluid style={{ padding: '2%' }}>
          <h3 style={{ textAlign: 'left', textTransform: 'none' }}> Hello, {state.first_name} </h3>
          <Row>
            <Col>
              <div className="roundup-bg">
              <br />
                <h6>Your Current Round Ups</h6>
                <p>${state.current_roundup_balance}</p>
                <br/>
              <h6>Collective Balance</h6>
                <p>${state.total_balance}</p>
              </div>
            </Col>
            <Col>
              <h4>Collective Achievements</h4>
                <Table hover borderd size="sm">
                  <thead>
                    <tr>
                      <th>Goal Objective</th>
                      <th>Cost</th>
                      <th>Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {goalCompleted(state.goals)}
                  </tbody>
                </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <Accordion>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    <h4 style={{ textAlign: 'left' }} >Transactions <span className="float-right">↓</span></h4>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    <Table striped bordered hover >
                      <thead>
                        <tr>
                          <th>Store Name</th>
                          <th>Amount</th>
                          <th>Date</th>
                          <th>Amount Rounded</th>
                        </tr>
                      </thead>
                      {trans.length > 0 ?
                      trans.map ( tran =>
                      <tbody>
                        <tr>
                          <td>{tran.name}</td>
                          <td>{tran.amount}</td>
                          <td>{tran.date}</td>
                          <td>{tran.roundup}</td>
                        </tr>
                      </tbody>) : null}
                    </Table>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
          <br />
          <hr />
          <br />
          <Row className="mt-5">
            <Col>
              <h4>Your Votes</h4>
              <p id="your_votes"></p>
              <ReactMinimalPieChart className="your_votes chartSize"
                data={[
                  {
                    title: 'Daily Food Bank',
                    value: v1,
                    color: '#3D348B'
                  },
                  {
                    title: 'Habitat for Humanity',
                    value: v2,
                    color: '#F7B801'
                  },
                  {
                    title: 'Parkinson Canada',
                    value: v3,
                    color: '#9895F7'
                  },
                  {
                    title: 'Princess Margaret Hospital',
                    value: v4,
                    color: '#F18701'
                  },
                  {
                    title: 'Sick Kids',
                    value: v5,
                    color: '#F35B04'
                  }
                ]}
                lineWidth={15}
                rounded
                animate
                onMouseOver={(event, data, dataIndex) => {
                  var node = document.getElementById('your_votes');
                  node.innerHTML = "<p>"+data[dataIndex].title+": "+Math.round(data[dataIndex].value).toFixed(2)+"%</p>";
                }}
                label={({data, dataIndex}) => (data[dataIndex].value ? (data[dataIndex].title):(null))}
                  labelStyle={{
                    fontSize: '2.25px',
                  }}
                  labelPosition={60}
              />
            </Col>
            <Col>
              <h4>Collective Votes</h4>
              <p id="collective_votes"></p>
                <ReactMinimalPieChart className="chartSize"
                  data={[
                    {
                      title: 'Daily Food Bank',
                      value: a1,
                      color: '#3D348B'
                    },
                    {
                      title: 'Habitat for Humanity',
                      value: a2,
                      color: '#F7B801'
                    },
                    {
                      title: 'Parkinson Canada',
                      value: a3,
                      color: '#9895F7'
                    },
                    {
                      title: 'Princess Margaret Hospital',
                      value: a4,
                      color: '#F18701'
                    },
                    {
                      title: 'Sick Kids',
                      value: a5,
                      color: '#F35B04'
                    }
                  ]}
                  lineWidth={15}
                  rounded
                  animate
                  onMouseOver={(event, data, dataIndex) => {
                  var node = document.getElementById('collective_votes');
                    node.innerHTML = "<p>"+data[dataIndex].title+": "+Math.round(data[dataIndex].value).toFixed(2)+"%</p>";
                  }}
                  label={({data, dataIndex}) => (data[dataIndex].value ? (data[dataIndex].title):(null))}
                    labelStyle={{
                      fontSize: '2.25px',
                    }}
                    labelPosition={60}
                />
          </Col>
        </Row>
      </Container>

    )
  }
}

export default Dashboard;