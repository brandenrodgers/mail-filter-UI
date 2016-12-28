import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import logo from '../logo.svg';
import '../styles/App.css';
import {updateName, getUserList} from '../actions/usersActions';
import NotFound from './NotFound';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleUpdateName = this.handleUpdateName.bind(this);
  }

  componentWillMount() {
    this.props.getUserList();
  }

  handleUpdateName() {
    this.props.updateName("bob");
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <input type="submit" onClick={this.handleUpdateName} value="Click me"/>
        <span> the current name is: {this.props.name}</span>
        <ul>
          {Object.keys(this.props.usersList).map(userKey => {
            return <li key={userKey}>{this.props.usersList[userKey][0]}</li>
          })}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  name: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired
};

const mapStateToProps = (state, params) => {
  return {
    name: state.user.name,
    usersList: state.user.usersList
  };
};

export default connect(mapStateToProps, {
  updateName,
  getUserList
})(App);
