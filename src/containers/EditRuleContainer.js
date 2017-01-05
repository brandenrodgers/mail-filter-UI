import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import '../styles/editRuleContainer.css';
import FolderSelectionContainer from './FolderSelectionContainer';
import {getRuleByUuid} from '../selectors/rulesSelectors';

class EditRuleContainer extends Component {

  constructor(props) {
    super(props);
    const {rule} = props;
    this.state = {
      password: '',
      email: rule.get('email') || '',
      mail_server: rule.get('mail_server') || '',
      showFolders: false
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleServerChange = this.handleServerChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.isButtonDisabled = this.isButtonDisabled.bind(this);
    this.handleShowFoldersClick = this.handleShowFoldersClick.bind(this);
    this.renderFolderSelector = this.renderFolderSelector.bind(this);
    this.renderShowFoldersButton = this.renderShowFoldersButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {rule} = this.props;
    const {rule: nextRule} = nextProps;
    if (nextRule.size > rule.size) {
      this.setState({email: nextRule.get('email'), mail_server: nextRule.get('mail_server')});
    }
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

  handlePasswordChange(evt) {
    this.setState({password: evt.target.value});
  }

  handleShowFoldersClick() {
    const {showFolders} = this.state;
    this.setState({showFolders: !showFolders});
  }

  isButtonDisabled() {
    const {email, password, mail_server} = this.state;
    return email.length === 0 || password.length === 0 || mail_server.length === 0;
  }

  renderShowFoldersButton() {
    const {showFolders} = this.state;
    return (
      <div className="flex-center-wrapper">
        <button
          className="large-btn submit-btn flex-basis-40 m-all-20"
          onClick={this.handleShowFoldersClick}
          disabled={this.isButtonDisabled()}>
          {showFolders ? 'Edit credentials' : 'Select folders'}
        </button>
      </div>
    );
  }

  renderFolderSelector() {
    const {email, password, mail_server, showFolders} = this.state;
    const {rule} = this.props;
    if (showFolders) {
      return (
        <FolderSelectionContainer
          email={email}
          password={password}
          mail_server={mail_server}
          source={rule.get('source')}
          target={rule.get('target')}
          uuid={rule.get('uuid')}
        />
      );
    }
    return null;
  }

  render() {
    const {password, email, mail_server, showFolders} = this.state;
    return (
      <div className="centered-content">
        <div className="flex-end-wrapper">
          <button className="large-btn cancel-btn" onClick={this.handleCancelClick}>
            Cancel
          </button>
        </div>
        <div className={`${showFolders ? 'disabled-wrapper' : ''} form-wrapper m-top-20`}>
          <div className="flex-wrapper m-all-20">
            <span>Email: </span>
            <input type="text" value={email} disabled={showFolders} onChange={this.handleEmailChange} />
          </div>
          <div className="flex-wrapper m-all-20">
            <span>Password: </span>
            <input type="password" value={password} disabled={showFolders} onChange={this.handlePasswordChange} />
          </div>
          <div className="flex-wrapper m-all-20">
            <span>Server: </span>
            <input type="text" value={mail_server} disabled={showFolders} onChange={this.handleServerChange} />
          </div>
        </div>
        {this.renderShowFoldersButton()}
        {this.renderFolderSelector()}
      </div>
    );
  }
}

EditRuleContainer.propTypes = {
  rule: PropTypes.instanceOf(Map)
};

const mapStateToProps = (state, {params}) => {
  return {
    rule: getRuleByUuid(state, params)
  };
};

export default connect(mapStateToProps)(EditRuleContainer);
