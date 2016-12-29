import React, {Component, PropTypes} from 'react';
import {List} from 'immutable';
import '../styles/usersList.css';
import trashIcon from '../images/trashcan.svg';
import penIcon from '../images/pen.svg';

class UserListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showItems: true
    };
    this.renderRule = this.renderRule.bind(this);
    this.renderRuleGroup = this.renderRuleGroup.bind(this);
    this.toggleShowItem = this.toggleShowItem.bind(this);
  }

  toggleShowItem() {
    const {showItems} = this.state;
    this.setState({showItems: !showItems});
  }

  renderRule(rule) {
    return (
      <div key={rule.get('uuid')} className="user-list-content">
        <div className="inline">
          <span>Filtering </span>
          <span className="highlighted-item list-source">{rule.get('source')}</span>
          <span>to </span>
          <span className="highlighted-item list-target">{rule.get('target')}</span>
        </div>
        <img src={trashIcon} className="inline list-img" alt="DELETE" />
        <img src={penIcon} className="inline list-img" alt="EDIT" />
      </div>
    );
  }

  renderRuleGroup() {
    const {showItems} = this.state;
    const {userRuleData} = this.props;
    if (showItems) {
      return (
        <div>
          <div className="list-server">
            Server: {userRuleData.first().get('mail_server')}
          </div>
          {userRuleData.entrySeq().map(([key, rule]) => this.renderRule(rule))}
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
        </div>
        {this.renderRuleGroup()}
      </div>
    );
  }
}

UserListItem.propTypes = {
  username: PropTypes.string.isRequired,
  userRuleData: PropTypes.instanceOf(List).isRequired
};

export default UserListItem;
