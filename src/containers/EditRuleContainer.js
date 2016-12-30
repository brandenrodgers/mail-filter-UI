import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import '../styles/editRuleContainer.css';
import {getRuleByUuid} from '../selectors/rulesSelectors';

class EditRuleContainer extends Component {

  constructor(props) {
    super(props);
    const {rule} = props;
    this.state = {
      password: '',
      email: rule.get('email') || '',
      server: rule.get('mail_server') || '',
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
  }

  handleCancelClick() {
    browserHistory.push('/home');
  }

  handleEmailChange(evt) {
    this.setState({email: evt.target.value});
  }

  handleServerChange(evt) {
    this.setState({server: evt.target.value});
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

  renderFormSubmitButton() {
    const {rule} = this.props;
    return (
      <div className="flex-end-wrapper">
        <button className="large-btn flex-basis-40 m-right-20">
          {rule.has('uuid') ? 'Update Rule' : 'Create Rule'}
        </button>
      </div>
    );
  }

  render() {
    const {password, email, server, source, target} = this.state;
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
            <input type="text" value={server} onChange={this.handleServerChange} />
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
  rule: PropTypes.instanceOf(Map)
};

const mapStateToProps = (state, params) => {
  return {
    rule: getRuleByUuid(state, params)
  };
};

export default connect(mapStateToProps)(EditRuleContainer);