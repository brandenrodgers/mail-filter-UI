import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import '../styles/editRuleContainer.css';
import {addNewRule, updateRule, getFoldersForUser} from '../actions/rulesActions';
import {getRuleByUuid} from '../selectors/rulesSelectors';

class EditRuleContainer extends Component {

  constructor(props) {
    super(props);
    const {rule} = props;
    this.state = {
      password: '',
      email: rule.get('email') || '',
      mail_server: rule.get('mail_server') || '',
      source: rule.get('source') || '',
      target: rule.get('target') || ''
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.renderFormSubmitButton = this.renderFormSubmitButton.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleServerChange = this.handleServerChange.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.isButtonDisabled = this.isButtonDisabled.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleCancelClick() {
    browserHistory.push('/home');
  }

  handleEmailChange(evt) {
    this.setState({email: evt.target.value});
  }

  handleServerChange(evt) {
    this.setState({mail_server: evt.target.value});
  }

  handleSourceChange(evt) {
    this.setState({source: evt.target.value});
  }

  handleTargetChange(evt) {
    this.setState({target: evt.target.value});
  }

  handlePasswordChange(evt) {
    this.setState({password: evt.target.value});
  }

  handleFormSubmit() {
    const {password, email, mail_server, source, target} = this.state;
    const {rule} = this.props;
    if (rule.has('uuid')) {
      this.props.updateRule(rule.get('uuid'), {password, email, mail_server, source, target});
    } else {
      this.props.addNewRule({password, email, mail_server, source, target});
    }
    browserHistory.push('/home');
  };

  isButtonDisabled() {
    const {password, email, mail_server, source, target} = this.state;
    return password.length === 0 ||
      email.length === 0 ||
      mail_server.length === 0 ||
      source.length === 0 ||
      target.length === 0;
  }

  renderFormSubmitButton() {
    const {rule} = this.props;
    return (
      <div className="flex-end-wrapper">
        <button
          className="large-btn submit-btn flex-basis-40 m-right-20"
          onClick={this.handleFormSubmit}
          disabled={this.isButtonDisabled()}>
          {rule.has('uuid') ? 'Update Rule' : 'Create Rule'}
        </button>
      </div>
    );
  }

  render() {
    const {password, email, mail_server, source, target} = this.state;
    return (
      <div className="centered-content">
        <div className="flex-end-wrapper">
          <button className="large-btn cancel-btn" onClick={this.handleCancelClick}>
            Cancel
          </button>
        </div>
        <div className="form-wrapper m-top-20">
          <div className="flex-wrapper m-all-20">
            <span>Email: </span>
            <input type="text" value={email} onChange={this.handleEmailChange} />
          </div>
          <div className="flex-wrapper m-all-20">
            <span>Server: </span>
            <input type="text" value={mail_server} onChange={this.handleServerChange} />
          </div>
          <div className="flex-wrapper m-all-20">
            <span>Source: </span>
            <input type="text" value={source} onChange={this.handleSourceChange} />
          </div>
          <div className="flex-wrapper m-all-20">
            <span>Target: </span>
            <input type="text" value={target} onChange={this.handleTargetChange} />
          </div>
          <div className="flex-wrapper m-all-20">
            <span>Password: </span>
            <input type="password" value={password} onChange={this.handlePasswordChange} />
          </div>
          {this.renderFormSubmitButton()}
        </div>
      </div>
    );
  }
}

EditRuleContainer.propTypes = {
  rule: PropTypes.instanceOf(Map),
  addNewRule: PropTypes.func.isRequired,
  updateRule: PropTypes.func.isRequired,
  getFoldersForUser: PropTypes.func.isRequired
};

const mapStateToProps = (state, params) => {
  return {
    rule: getRuleByUuid(state, params)
  };
};

export default connect(mapStateToProps, {
  addNewRule,
  updateRule,
  getFoldersForUser
})(EditRuleContainer);
