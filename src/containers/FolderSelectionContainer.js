import React, {Component, PropTypes} from 'react';
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import RequestStatusTypes from '../utils/RequestStatusTypes';
import '../styles/editRuleContainer.css';
import {addNewRule, updateRule, getFoldersForUser} from '../actions/rulesActions';
import {
  getFoldersForUserByEmail,
  getFoldersForUserByEmailRequestStatus
} from '../selectors/rulesSelectors';

class FolderSelectionContainer extends Component {

  constructor(props) {
    super(props);
    const {source, target} = this.props;
    this.state = {
      source: source || '',
      target: target || ''
    };
    this.renderFormSubmitButton = this.renderFormSubmitButton.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.isButtonDisabled = this.isButtonDisabled.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderSourceSelect = this.renderSourceSelect.bind(this);
    this.renderTargetSelect = this.renderTargetSelect.bind(this);
  }

  componentWillMount() {
    const {email, password, mail_server, userFoldersRequestStatus} = this.props;
    if (userFoldersRequestStatus === RequestStatusTypes.UNINITIALIZED ||
      userFoldersRequestStatus === RequestStatusTypes.FAILED) {
      this.props.getFoldersForUser(email, password, mail_server);
    }
  }

  handleSourceChange(evt) {
    this.setState({source: evt.target.value});
  }

  handleTargetChange(evt) {
    this.setState({target: evt.target.value});
  }

  handleFormSubmit() {
    const {source, target} = this.state;
    const {password, email, mail_server, uuid} = this.props;
    if (uuid) {
      this.props.updateRule(uuid, {password, email, mail_server, source, target});
    } else {
      this.props.addNewRule({password, email, mail_server, source, target});
    }
    browserHistory.push('/home');
  };

  isButtonDisabled() {
    const {source, target} = this.state;
    return source.length === 0 || target.length === 0;
  }

  renderFormSubmitButton() {
    const {uuid} = this.props;
    return (
      <div className="flex-end-wrapper">
        <button
          className="large-btn submit-btn flex-basis-40 m-right-20"
          onClick={this.handleFormSubmit}
          disabled={this.isButtonDisabled()}>
          {uuid ? 'Update Rule' : 'Create Rule'}
        </button>
      </div>
    );
  }

  renderSourceSelect() {
    const {source, target} = this.state;
    const {userFolders} = this.props;
    return (
      <select value={source} onChange={this.handleSourceChange}>
        <option value="" disabled>Select a folder</option>
        {userFolders.entrySeq().map(([folder, isDangerous])=> {
          if (folder !== target) {
            return (
              <option key={folder} value={folder}>
                {folder}{isDangerous ? '' : '  (empty)'}
              </option>
            );
          }
          return null;
        })}
      </select>
    );
  }

  renderTargetSelect() {
    const {source, target} = this.state;
    const {userFolders} = this.props;
    return (
      <select value={target} onChange={this.handleTargetChange}>
        <option value="" disabled>Select a folder</option>
        {userFolders.entrySeq().map(([folder, isDangerous]) => {
          if (folder !== source) {
            return (
              <option
                key={folder}
                value={folder}
                className={isDangerous ? 'dangerous-option' : 'safe-option'}>
                {folder}{isDangerous ? '' : '  (empty)'}
              </option>
            );
          }
          return null;
        })}
      </select>
    );
  }

  render() {
    const {userFoldersRequestStatus} = this.props;
    if (userFoldersRequestStatus === RequestStatusTypes.SUCCEEDED) {
      return (
        <div className="centered-content">
          <div className="form-wrapper m-top-20">
            <div className="flex-wrapper m-all-20">
              <span>Source: </span>
              {this.renderSourceSelect()}
            </div>
            <div className="flex-wrapper m-all-20">
              <span>Target: </span>
              {this.renderTargetSelect()}
            </div>
            {this.renderFormSubmitButton()}
          </div>
        </div>
      );
    }
    return (
      <div className="centered-content">
        <div className="form-wrapper m-top-20">
          {userFoldersRequestStatus === RequestStatusTypes.FAILED ? 'Invalid Credentials' : 'Loading folders...'}
        </div>
      </div>
    );
  }

}

FolderSelectionContainer.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  mail_server: PropTypes.string.isRequired,
  source: PropTypes.string,
  target: PropTypes.string,
  uuid: PropTypes.string,
  userFolders: PropTypes.instanceOf(Map).isRequired,
  userFoldersRequestStatus: PropTypes.string.isRequired,
  addNewRule: PropTypes.func.isRequired,
  updateRule: PropTypes.func.isRequired,
  getFoldersForUser: PropTypes.func.isRequired
};

const mapStateToProps = (state, params) => {
  return {
    userFolders: getFoldersForUserByEmail(state, params),
    userFoldersRequestStatus: getFoldersForUserByEmailRequestStatus(state, params)
  };
};

export default connect(mapStateToProps, {
  addNewRule,
  updateRule,
  getFoldersForUser
})(FolderSelectionContainer);
