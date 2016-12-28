import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import '../styles/app.css';
import {getUsersList} from '../actions/usersActions';
import Header from '../components/Header';

class App extends Component {

  componentWillMount() {
    this.props.getUsersList();
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
  children: PropTypes.node.isRequired
};

export default connect(() => {return {}}, {
  getUsersList
})(App);
