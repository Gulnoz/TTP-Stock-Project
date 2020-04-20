import React from "react";
import { Link } from 'react-router-dom'
import { Button } from "react-bootstrap";
import './nav.styles.scss';

class Nav extends React.Component {
  logOutHandler = () => {
    window.localStorage.clear();
    this.props.logOutHendler();
  };
  render() {
    return (
      <div className="nav-buttons-right"  style={{  }}>
        <Button variant="outline-dark" as={Link} to="/" >Portfolio</Button>
        <Button variant="outline-dark" as={Link} to="/Transactions" >Transactions</Button>
        <Button variant="outline-primary" as={Link} to="/login" onClick={() => this.logOutHandler()}>Log out</Button>
      </div>
    );
  }
}
export default Nav;
