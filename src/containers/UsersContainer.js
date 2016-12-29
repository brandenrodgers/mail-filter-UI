import React, {PropTypes, Component} from 'react';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {getUsersList} from '../actions/usersActions';
import RequestStatusTypes from '../utils/RequestStatusTypes';
import UserListItem from '../components/UserListItem';
import '../styles/usersContainer.css';

class UsersContainer extends Component {

  constructor(props) {
    super(props);
    this.renderUserList = this.renderUserList.bind(this);
  }

  componentWillMount() {
    const {usersRequestStatus} = this.props;
    if (usersRequestStatus === RequestStatusTypes.UNINITIALIZED) {
      this.props.getUsersList();
    }
  }

  renderUserList() {
    const {users, usersRequestStatus} = this.props;
    if (usersRequestStatus === RequestStatusTypes.SUCCEEDED) {
      if (users.size) {
        return users.entrySeq().map(([key, user]) =>
          <UserListItem key={key} username={key} userRuleData={user}/>
        );
      }
      return <div className="big-message">No current rules</div>;
    }
    return <div className="big-message">Loading rules...</div>;
  }

  render() {
    return (
      <div>
        <div className="new-rule-btn-wrapper">
          <button className="new-rule-btn">Add rule</button>
        </div>
        {this.renderUserList()}
      </div>
    );
  }
}

UsersContainer.propTypes = {
  users: PropTypes.instanceOf(Map).isRequired,
  usersRequestStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state, params) => {
  return {
    users: state.users.users,
    usersRequestStatus: state.users.request
  };
};

export default connect(mapStateToProps, {
  getUsersList
})(UsersContainer);
