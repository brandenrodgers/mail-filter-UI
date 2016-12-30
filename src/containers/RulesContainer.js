import React, {PropTypes, Component} from 'react';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import RequestStatusTypes from '../utils/RequestStatusTypes';
import UserRuleList from '../components/UserRuleList';
import '../styles/usersContainer.css';

class UsersContainer extends Component {

  constructor(props) {
    super(props);
    this.renderUserRuleList = this.renderUserRuleList.bind(this);
    this.handleAddRuleClick = this.handleAddRuleClick.bind(this);
  }

  handleAddRuleClick() {
    browserHistory.push('/rule');
  }

  renderUserRuleList() {
    const {users, rulesRequestStatus, deleteRequestStatuses} = this.props;
    if (rulesRequestStatus === RequestStatusTypes.SUCCEEDED) {
      if (users.size) {
        return users.entrySeq().map(([key, user]) =>
          <UserRuleList
            key={key}
            username={key}
            userRuleData={user}
            deleteRequestStatuses={deleteRequestStatuses}
          />
        );
      }
      return <div className="big-message">No current rules</div>;
    }
    return <div className="big-message">Loading rules...</div>;
  }

  render() {
    return (
      <div className="centered-content">
        <div className="flex-end-wrapper">
          <button className="large-btn new-rule-btn" onClick={this.handleAddRuleClick}>Add rule</button>
        </div>
        {this.renderUserRuleList()}
      </div>
    );
  }
}

UsersContainer.propTypes = {
  users: PropTypes.instanceOf(Map).isRequired,
  rulesRequestStatus: PropTypes.string.isRequired,
  deleteRequestStatuses: PropTypes.instanceOf(Map).isRequired
};

const mapStateToProps = (state, params) => {
  return {
    users: state.rules.users,
    rulesRequestStatus: state.rules.rulesListRequestStatus,
    deleteRequestStatuses: state.rules.deleteRequestStatuses
  };
};

export default connect(mapStateToProps)(UsersContainer);
