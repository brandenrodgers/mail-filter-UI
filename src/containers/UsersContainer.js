import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import UserListItem from '../components/UserListItem';
import '../styles/usersContainer.css';

class UsersContainer extends Component {

  render() {
    const {users} = this.props;
    return (
      <div>
        <div className="new-rule-btn-wrapper">
          <button className="new-rule-btn">Add rule</button>
        </div>
        {Object.keys(users).map(key => <UserListItem key={key} username={key} userData={users[key]} />)}
      </div>
    );
  }
}

UsersContainer.propTypes = {
  users: PropTypes.object.isRequired
};

const mapStateToProps = (state, params) => {
  return {
    users: state.users.users
  };
};

export default connect(mapStateToProps)(UsersContainer);
