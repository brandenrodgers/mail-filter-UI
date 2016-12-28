import React, {Component, PropTypes} from 'react';
import '../styles/usersList.css';

class UserListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showItems: true
    };
    this.renderListItem = this.renderListItem.bind(this);
    this.renderData = this.renderData.bind(this);
    this.toggleShowItem = this.toggleShowItem.bind(this);
  }

  toggleShowItem() {
    const {showItems} = this.state;
    this.setState({showItems: !showItems});
  }

  renderListItem(userData) {
    return (
      <div key={userData.uuid} className="user-list-content">
        <span>Filtering </span>
        <span className="highlighted-item list-source">{userData.source}</span>
        <span>to </span>
        <span className="highlighted-item list-target">{userData.target}</span>
      </div>
    );
  }

  renderData(userData) {
    const {showItems} = this.state;
    if (showItems) {
      return (
        <div>
          <div className="list-server">
            Server: {userData[0].mail_server}
          </div>
          {userData.map(data => this.renderListItem(data))}
        </div>
      );
    }
    return null;
  }

  render() {
    const {username, userData} = this.props;
    return (
      <div className='user-list-item'>
        <div className="user-list-header" onClick={this.toggleShowItem}>
          {username}
        </div>
        {this.renderData(userData)}
      </div>
    );
  }
}

UserListItem.propTypes = {
  username: PropTypes.string.isRequired,
  userData: PropTypes.array.isRequired
};

export default UserListItem;
