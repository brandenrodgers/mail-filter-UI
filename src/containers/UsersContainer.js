import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import UserListItem from '../components/UserListItem';

class UsersContainer extends Component {

  render() {
    const {users} = this.props;
    return (
      <div>
        <input type="submit" value="Add new rule" />
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
