import React, { Component, cloneElement } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import PlaidLink from 'react-plaid-link'


// import Router from './components/Router.js';

import NavBar from './components/NavBar.js';
import HeroSection from './components/HeroSection.js';


import Login from './components/Login.js';
import Register from './components/Register.js';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!',
      isLoggedIn: false,
      email: "",
      password: "",
      currentUser: 0,
      first_name: "",
      last_name: "",
      password_confirmation: "",
      data: "",
      cookie: "",
      charities: [],
    }
  };

  fetchData = (e) => {
    e.preventDefault();
    debugger;
    axios.get('/api/users', {withCredentials: true}) // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log("response:", response.data) // The entire response from the Rails API

      // console.log(response.data.users) // Just the message
      // this.setState({
      //   message: response.data.users[0].email
      // });
    })

  };
 componentDidMount() {

    axios.get('/api/charities', {withCredentials: true})
    .then((response) => {
      this.setState({
        charities: response.data.charities
      })
      console.log(response.data)
    })
  }

  handleRegister = (e) =>  {
    e.preventDefault();
    axios.post('/api/users', {
      user: {
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password_confirmation: this.state.password_confirmation,
        currentUser: 0,
        isLoggedIn: false,
        authentication_token: ""
      }
    })
    .then(response => {
      this.setState({
        isLoggedIn: true,
        currentUser: response.data.first_name,
      })
    }).then(axios.get('/api/users', {withCredentials: true}) // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.users) // Just the message
      // this.setState({
      //   message: response.data.users[0].email
      // });
    }))
  };



  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleLogin = (e) => {
    e.preventDefault();
    axios.post('/api/session', {
        email: this.state.email,
        password: this.state.password,
    })
    .then(response => {
      this.setState({
        isLoggedIn: true,
        currentUser: response.data.user_id
      })
    })
  };

  handleLogout = (e) => {
    e.preventDefault();
      this.setState({
        isLoggedIn: false,
        authentication_token: "",
    })
  };

   handleOnSuccess = (token, metadata) => {
    // send token to client server
    console.log(token)
    console.log(metadata)

    // client.exchangePublicToken(token, (err, res) => {
    //   if(err != null){
    //     console.log("Could not exchange token!");
    //     return res.json({error: msg});
    //   }
    //  var access_token = res.access_token;
    //  var item_id = res.item_id
    // })
    axios.post('/api/items', {
      item: {
      public_token: token,
      //access_token: access_token,
      institution_name: metadata.institution.name,
      institution_id: metadata.institution.institution_id,
      user_id: this.state.currentUser
    }
    })
    .then(res => {
      console.log(res.data)
    })
  }




  withRoute = child => (
    <Route
      exact={child.props.exact || !!child.props.path}
      key={child.name}
      path={child.props.path || '/'}
      render={routeProps => cloneElement(
        child,
        {
          mainState: this.state,
          handleLogin: this.handleLogin,
          handleRegister: this.handleRegister,
          handleInputChange: this.handleInputChange,
          fetchData: this.fetchData,
          ...routeProps
        }
        )}
      />);




  handleOnExit(err) {
    // handle the case when your user exits Link
    console.log(err)
  }

  render() {
    const {
      children
    } = this.props;

    const enhancedChildren =
      Array.isArray(children)
        ? children.map(this.withRoute)
        : this.withRoute(children);

    return (
      <div className="App">
        <PlaidLink
          clientName="Change Collective"
          env="sandbox"
          product={["auth", "transactions"]}
          publicKey="a165568792fe5fd82ba0f4ecbef6da"
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}>
          Open Link and connect your bank!
        </PlaidLink>
        {enhancedChildren}
      </div>
    );
  }
}

export default App;
