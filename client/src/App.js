import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import NavBar from './components/NavBar.js'
import HeroSection from './components/HeroSection.js'


import Login from './components/Login.js'
import Register from './components/Register.js'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!',
      isLoggedIn: false,
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      password_confirmation: "",
      data: ""

    }
  }


  fetchData = () => {
    axios.get('/api/users') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.users) // Just the message
      this.setState({
        message: response.data.users[0].email
      });
    })

  }

  handleLogin = (e) =>  {
    e.preventDefault()
    axios.post('/api/users', {
      user: {
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password_confirmation: this.state.password_confirmation
      }
    })
    .then(function (response) {
       console.log("response data", response.data)
    })
  };

  handleInputChange = (e) => {
    console.log(e)
    console.log(e.target.name)
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  render() {
    return (
      <div className="App">
        <NavBar user={this.state.isLoggedin} />
        <HeroSection />
      </div>
    );
  }
}

export default App;
