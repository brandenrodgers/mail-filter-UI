import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import '../styles/app.css';
import Header from '../components/Header';

class App extends Component {

  render() {
    const {children} = this.props;
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          {children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default connect()(App);
