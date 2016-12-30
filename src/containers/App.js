import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getRulesList} from '../actions/rulesActions';
import '../styles/app.css';
import Header from '../components/Header';

class App extends Component {

  componentWillMount() {
    this.props.getRulesList();
  }

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
  children: PropTypes.node.isRequired,
  getRulesList: PropTypes.func.isRequired
};

export default connect(() => {return {}}, {
  getRulesList
})(App);
