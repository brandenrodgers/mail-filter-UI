import React, {PropTypes, Component} from 'react';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {getRulesList} from '../actions/rulesActions';
import RequestStatusTypes from '../utils/RequestStatusTypes';
import UserRuleList from '../components/UserRuleList';
import '../styles/usersContainer.css';

class UsersContainer extends Component {

  constructor(props) {
    super(props);
    this.renderUserRuleList = this.renderUserRuleList.bind(this);
  }

  componentWillMount() {
    const {rulesRequestStatus} = this.props;
    if (rulesRequestStatus === RequestStatusTypes.UNINITIALIZED) {
      this.props.getRulesList();
    }
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
      <div>
        <div className="new-rule-btn-wrapper">
          <button className="new-rule-btn">Add rule</button>
        </div>
        {this.renderUserRuleList()}
      </div>
    );
  }
}

UsersContainer.propTypes = {
  users: PropTypes.instanceOf(Map).isRequired,
  rulesRequestStatus: PropTypes.string.isRequired,
  getRulesList: PropTypes.func.isRequired,
  deleteRequestStatuses: PropTypes.instanceOf(Map).isRequired
};

const mapStateToProps = (state, params) => {
  return {
    users: state.rules.users,
    rulesRequestStatus: state.rules.rulesListRequestStatus,
    deleteRequestStatuses: state.rules.deleteRequestStatuses
  };
};

export default connect(mapStateToProps, {
  getRulesList
})(UsersContainer);
