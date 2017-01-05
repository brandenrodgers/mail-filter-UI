import React, {Component, PropTypes} from 'react';
import {Map, List} from 'immutable';
import '../styles/usersList.css';
import RequestStatusTypes from '../utils/RequestStatusTypes';
import UserRuleListItem from './UserRuleListItem';
import upArrowIcon from '../images/up_arrow.png'
import downArrowIcon from '../images/down_arrow.png';

class UserRuleList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showItems: true
    };
    this.renderRuleGroup = this.renderRuleGroup.bind(this);
    this.toggleShowItem = this.toggleShowItem.bind(this);
  }

  toggleShowItem() {
    const {showItems} = this.state;
    this.setState({showItems: !showItems});
  }

  renderRuleGroup() {
    const {showItems} = this.state;
    const {userRuleData, deleteRequestStatuses} = this.props;
    if (showItems) {
      return (
        <div>
          <div className="list-server">
            Server: {userRuleData.first().get('mail_server')}
          </div>
          {userRuleData.entrySeq().map(([key, rule]) => {
            const deleteStatus = deleteRequestStatuses.get(rule.get('uuid')) || RequestStatusTypes.UNINITIALIZED;
            return <UserRuleListItem
              key={key}
              rule={rule}
              deleteRequestStatus={deleteStatus}
            />;
          })}
        </div>
      );
    }
    return null;
  }

  render() {
    const {showItems} = this.state;
    const {username} = this.props;
    return (
      <div className={`user-list-item ${showItems ? '' : 'small-margin'}`}>
        <div className="user-list-header" onClick={this.toggleShowItem}>
          {username}
          <img src={showItems ? upArrowIcon : downArrowIcon} className="arrow-icon" alt={showItems ? '-' : '+'}/>
        </div>
        {this.renderRuleGroup()}
      </div>
    );
  }
}

UserRuleList.propTypes = {
  username: PropTypes.string.isRequired,
  userRuleData: PropTypes.instanceOf(List).isRequired,
  deleteRequestStatuses: PropTypes.instanceOf(Map).isRequired
};

export default UserRuleList;
