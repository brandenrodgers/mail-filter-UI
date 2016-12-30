import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {deleteRule, clearDeleteRuleStatus} from '../actions/rulesActions';
import '../styles/usersList.css';
import RequestStatusTypes from '../utils/RequestStatusTypes';
import trashIcon from '../images/trashcan.svg';
import penIcon from '../images/pen.svg';

class UserRuleListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDeleteRule: false,
      password: ''
    };
    this.renderIcons = this.renderIcons.bind(this);
    this.toggleShowDeleteRule = this.toggleShowDeleteRule.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleDeleteRuleClick = this.handleDeleteRuleClick.bind(this);
  }

  toggleShowDeleteRule() {
    const {showDeleteRule} = this.state;
    const {rule, deleteRequestStatus} = this.props;
    if (showDeleteRule && deleteRequestStatus === RequestStatusTypes.FAILED) {
      this.props.clearDeleteRuleStatus(rule.get('uuid'));
    }
    this.setState({showDeleteRule: !showDeleteRule, password: ''});
  }

  updatePassword(evt) {
    this.setState({password: evt.target.value});
  }

  handleDeleteRuleClick() {
    const {password} = this.state;
    const {rule} = this.props;
    this.props.deleteRule(rule.get('uuid'), password);
  }

  renderIcons() {
    const {showDeleteRule, password} = this.state;
    const {deleteRequestStatus} = this.props;
    if (showDeleteRule) {
      if (deleteRequestStatus === RequestStatusTypes.PENDING) {
        return <div>Deleting Rule...</div>;
      }
      return (
        <div>
          {deleteRequestStatus === RequestStatusTypes.FAILED ? 'Incorrect Password' : null}
          <input type="password" placeholder="password" onChange={this.updatePassword} />
          <button className="cancel" onClick={this.toggleShowDeleteRule}>Cancel</button>
          <button className="delete" onClick={this.handleDeleteRuleClick} disabled={password.length === 0}>Delete</button>
        </div>
      );
    }
    return (
      <div>
        <img src={penIcon} className="list-img pen" alt="EDIT" />
        <img src={trashIcon} onClick={this.toggleShowDeleteRule} className="list-img trashcan" alt="DELETE" />
      </div>
    );
  }

  render() {
    const {rule} = this.props;
    return (
      <div className="user-list-content">
        <div>
          <span>Filtering </span>
          <span className="highlighted-item list-source">{rule.get('source')}</span>
          <span>to </span>
          <span className="highlighted-item list-target">{rule.get('target')}</span>
        </div>
        {this.renderIcons()}
      </div>
    );
  }
}

UserRuleListItem.propTypes = {
  rule: PropTypes.instanceOf(Map).isRequired,
  deleteRule: PropTypes.func.isRequired,
  clearDeleteRuleStatus: PropTypes.func.isRequired,
  deleteRequestStatus: PropTypes.string.isRequired
};

export default connect(() => {return {}}, {
  deleteRule,
  clearDeleteRuleStatus
})(UserRuleListItem);
