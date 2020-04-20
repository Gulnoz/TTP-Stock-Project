import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./Pages/homepage/homepage.component";
import Login from "./components/Auth/login.component";
import { Redirect } from "react-router-dom";
import { Transactions } from "./components/transaction/transaction.component";
import Portfolio from './components/portfolio/portfolio.component';
import Nav from "./components/Nav/nav.component";
class App extends React.Component {

    state = {
      user: null
    };

    setUser = (user) => {
      this.setState({ user: user });
    }
      
  
  logOutHendler=()=>{
    this.setState({ user: null });
  }
  componentWillMount() {
    //console.log('test')
    if (localStorage.getItem("currentUserToken")) {
      //console.log(localStorage.getItem('currentUserToken'))

  fetch("http://localhost:3000/auth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("currentUserToken")}`
        }
      })
       .then(res => res.json())
        .then(user => {
          this.setState({ user: user.user.data });
          localStorage.clear();
          localStorage.setItem("currentUserToken", user.jwt)
           return < Portfolio logOutHendler = { this.logOutHendler }addStockTransaction = { this.addStockTransaction }user = { this.state.user }/>

        })
        .catch(console.log);
      //return { Authorization: `Bearer ${currentUser.token}` };
    } else {
      // return <UserContainer onChangeSelectHendler={this.onChangeSelectHendler} handleSubmit={this.handleSubmit} handleChange={this.handleChange} editEventNull={this.editEventNull} updateEventHendler={this.updateEventHendler} ref={this.createEventFormElement} createEventFormState={this.state.createEventFormState} addEventHendler={this.addEventHendler} popUpFavoriteHendler={this.popUpFavoriteHendler} favorits={this.state.favorits} userEvents={this.state.userEvents} currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} categories={this.state.categories} setUserEvents={this.setUserEvents} />
      return <Login setUser={this.setUser} />

    }
  }
  addStockTransaction=(stock)=>{
    let user=this.state.user;
    user.attributes.transactions.push(stock)
    this.setState({user: user});
  }
  render() {
    return (
      <> {this.state.user?
        <Nav history={this.props} logOutHendler={this.logOutHendler} />
        :null}
      <Switch>
        <Route
          exact
          path="/"
          render={props =>
            !this.state.user ? (
               <Redirect to="/login" />
              
            ) : (
                <Portfolio logOutHendler={this.logOutHendler}addStockTransaction={this.addStockTransaction}user={this.state.user} {...props} />
            )
          }
        />
        {/* <Route exact path="/" user={this.state} setUser={this.setUser} component={HomePage} /> */}
        <Route
          exact
          path="/Transactions"
          render={props =>
            this.state.user ? (
              (
                <Transactions logOutHendler={this.logOutHendler} user={this.state.user}{...props} />
              )
            ) : <Redirect to="/login" />
          }
        />
         <Route
          exact
          path="/Login"
          render={props =>
            !this.state.user ? (
              <Login {...props} setUser={this.setUser}/>
            ) : (
              <Redirect to="/" />
            )
          }
        />
        } />
      </Switch>
      </>
    );
  }
}

export default App;
