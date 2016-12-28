import React, {Component} from 'react';
import '../styles/header.css';
import mailIcon from '../images/mail.svg';

class Header extends Component {
  render() {
    return (
      <div className='app-header'>
        <img src={mailIcon} className="mail-icon" alt="mail"/>
        <span className="app-header-text">Active Mail Filter</span>
      </div>
    );
  }
}

export default Header;
