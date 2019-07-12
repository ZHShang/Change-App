import React, { Component, Children, cloneElement } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { loadReCaptcha } from 'react-recaptcha-google'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      password_confirmation: "",
      currentUser: 0,
      current_roundup_balance: 0,
      balance_date: null,
      user_votes: [0,0,0,0,0],
      collective_votes: [0,0,0,0,0],
      collective_roundup_balance: 0,
      total_balance: 0,
      charities: [],
      goals: [],
      tests: [],
      vote1:"",
      vote2:"",
      vote3:"",
      vote4:"",
      vote5:"",
      transactions: [],
      dailyObj: [],
      habitatObj: [],
      parkObj: [],
      princessObj: [],
      sickkidsObj: [],
      disabled: true,
      plaidConnected: false,
    }
  };

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

 componentDidMount() {
  loadReCaptcha();
  if (!this.state.charities) {
    axios.get('/api/charities', {withCredentials: true})
    .then((response) => {
      this.setState({
        charities: response.data.charities,
        tests: response.data.tests,
        dailyObj: response.data.dailyObj,
        habitatObj: response.data.habitatObj,
        parkObj: response.data.parkObj,
        princessObj: response.data.princessObj,
        sickkidsObj: response.data.sickkidsObj
      })
        this.state.charities[0].objectives = this.state.dailyObj
        this.state.charities[1].objectives = this.state.habitatObj
        this.state.charities[2].objectives = this.state.parkObj
        this.state.charities[3].objectives = this.state.princessObj
        this.state.charities[4].objectives = this.state.sickkidsObj
        localStorage.setItem("charities", JSON.stringify(response.data.charities))
        localStorage.setItem("tests", JSON.stringify(response.data.tests))
    })
  }

    axios.get('/api/goals', {withCredentials: true})
    .then((response) => {
      this.setState({
        goals: response.data.goals
      })
      localStorage.setItem("goals", JSON.stringify(response.data.goals))

    })

    this.hydrateStateWithLocalStorage()
  }

  onLoadRecaptcha = () => {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }
  verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!
    console.log(recaptchaToken, "<= your recaptcha token")
    this.setState({ disabled: false })
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
      }
    })
    .then(response => {
      this.setState({
        isLoggedIn: true,
        currentUser: response.data.user_id,
        first_name: response.data.first_name,
      })
      localStorage.setItem("isLoggedIn", true)
      localStorage.setItem("currentUser", response.data.user_id)
      localStorage.setItem("first_name", response.data.first_name)
      window.location = "/votes"
    })
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.target.name === "password" || e.target.name === "password_confirmation") {
      localStorage.setItem("password", "hidden")
    }
    else {localStorage.setItem(e.target.name, e.target.value)}
  }

  handleLogin = (e) => {
    e.preventDefault();
    axios.post('/api/session', {
        email: this.state.email,
        password: this.state.password,
    })
    .then(response => {
      this.setState({
        isLoggedIn: true,
        currentUser: response.data.user_id,
        first_name: response.data.first_name
      })
      localStorage.setItem("isLoggedIn", true)
      localStorage.setItem("currentUser", response.data.user_id)
      localStorage.setItem("first_name", response.data.first_name)
      window.location = "/dashboard"
    })
  };

  handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear()
    axios.delete('/api/session')
    .then(response => {
    window.location = "/"
    this.setState({
        isLoggedIn: false,
    })
    localStorage.setItem("isLoggedIn", false)
    })
  };

  getDashboardInfo = () => {
    axios.get('api/session')
    .then(response => {
      this.setState({
        current_roundup_balance: response.data.currentUser.current_roundup_balance,
        user_votes: response.data.currentUser.votes,
        collective_votes: response.data.admin.votes,
        total_balance: response.data.admin.total_balance,
        transactions: response.data.transactions
      })
      localStorage.setItem("current_roundup_balance", response.data.current_roundup_balance)
      localStorage.setItem("user_votes", response.data.user_votes)
    })
  }

  displayObjectives = (tests) => {
    tests.forEach(test => {
      console.log("test", test)
      if (test.id in this.state.goalObj) {
        console.log("here")
        this.state.goalObj[test.id].objectives.push(test.objective)
        this.state.goalObj[test.id].push(test.objective)
      }
    });
  }

  handleVoteSelection = (e) => {
    e.preventDefault();

    let v1 = Number(this.state.vote1)
    let v2 = Number(this.state.vote2)
    let v3 = Number(this.state.vote3)
    let v4 = Number(this.state.vote4)
    let v5 = Number(this.state.vote5)

    let arr1 = [0,0,0,0,0]
    arr1[v1] += 1
    arr1[v2] += 1
    arr1[v3] += 1
    arr1[v4] += 1
    arr1[v5] += 1

    let new_user_votes = [];
    arr1.forEach(vote => {
     new_user_votes.push(vote * vote)
    })
    this.setState({
      user_votes: new_user_votes
    })
    localStorage.setItem("user_votes", JSON.stringify(new_user_votes))
    axios.put('api/users/id', {
      user: {
      votes: new_user_votes
    }
    }).then(response => {
      this.setState({
        user_votes: response.data.user_votes,
        collective_votes: response.data.admin_votes
      });
      localStorage.setItem("user_votes", JSON.stringify(response.data.user_votes))
      localStorage.setItem("collective_votes", JSON.stringify(response.data.admin_votes))
      window.location = "/dashboard"
    })


  }

  onVoteChanged = (e) => {
    this.setState({
      [e.target.name]: e.currentTarget.value
    });
    localStorage.setItem(e.target.name, e.target.value)
  }

  getTransactions = (e) => {
    e.preventDefault();
    axios.post('api/transactions', {
      user_id: this.state.currentUser
    })
    .then(response => {
      console.log(response.data)
      this.setState({
        transactions: response.data.transaction,
        total_balance: response.data.total_balance
      })
      localStorage.setItem("transactions", JSON.stringify(response.data.transaction))
      localStorage.setItem("total_balance", JSON.stringify(response.data.total_balance))
    })
  }

  withRoute = child => {
    return (
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
            handleLogout: this.handleLogout,
            isLoggedIn: this.isLoggedIn,
            handleLogout: this.handleLogout,
            getDashboardInfo: this.getDashboardInfo,
            changeLoggedIn: this.changeLoggedIn,
            handleVoteSelection: this.handleVoteSelection,
            onVoteChanged: this.onVoteChanged,
            getTransactions: this.getTransactions,
            displayObjectives: this.displayObjectives,
            onLoadRecaptcha: this.onLoadRecaptcha,
            verifyCallback: this.verifyCallback,
            handleOnSuccess: this.handleOnSuccess,
            handleOnExit: this.handleOnExit,
            ...routeProps
          }
          )}
        />);
  }

   handleOnSuccess = (token, metadata) => {
    // send token to client server
    console.log(token)
    console.log(metadata)

    axios.post('/api/items', {
      item: {
      public_token: token,
      institution_name: metadata.institution.name,
      institution_id: metadata.institution.institution_id,
      user_id: this.state.currentUser
    }
    })
    .then(res => {
      this.setState({
        plaidConnected: true
      })
      console.log(res.data)
    })
  }




  handleOnExit(err) {
    // handle the case when your user exits Link
    console.log(err)
  }

  render() {
    const {
      children
    } = this.props;

    return (
      <div className="App">
        {Children.map(children, this.withRoute)}
      </div>
    );
  }
}

export default App;
