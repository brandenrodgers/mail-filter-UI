import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import '../styles/header.css';
import mailIcon from '../images/mail.svg';

class Header extends Component {

  constructor(props) {
    super(props);
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  handleIconClick() {
    browserHistory.push('/home');
  }

  render() {
    return (
      <div className='app-header'>
        <img src={mailIcon} onClick={this.handleIconClick} className="mail-icon" alt="mail"/>
        <span className="app-header-text">Active Mail Filter</span>
      </div>
    );
  }
}

export default Header;
