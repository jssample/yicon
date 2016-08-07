import './Info.scss';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import { fetchUnreadNotification } from '../../../actions/notification';

@connect(
  state => ({ infoCount: state.user.notification.unReadCount }),
  { fetchUnreadNotification }
)
class Info extends Component {
  static propTypes = {
    infoCount: PropTypes.number,
    fetchUnreadNotification: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchUnreadNotification();
    this.pulseId = setInterval(() => {
      this.props.fetchUnreadNotification();
    }, 30 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.pulseId);
  }

  render() {
    const { infoCount } = this.props;
    const countNum = infoCount
      ? <i className="nav-message-count">{infoCount}</i>
      : null;

    return (
      <li className="lists">
        <Link to="/user/notifications" className="nav-message">
          <i className="iconfont">&#xf50d;</i>
          {countNum}
        </Link>
      </li>
    );
  }
}

export default Info;
