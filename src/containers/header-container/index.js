import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import session from '@store/session/actions';
import LayoutHeader from '@components/layouts/layout-header';
import Button from '@components/elements/button';
import modal from '@store/modal/actions';

class HeaderContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
  };

  onClickHome = () => {
    this.props.history.push('/');
  };

  onClickLogin = () => {
    this.props.history.push('/login');
  };

  onClickRegistration = async () => {
    await modal.open('registration', {
      overflowTransparent: false,
      overflowClose: true,
    });
  };

  onClickLogout = () => {
    session.clear();
  };

  renderLeft() {
    const { location } = this.props;
    if (location.pathname === '/login') {
      return (
        <Button key={1} theme={['gray-back', 'margins']} onClick={this.onClickHome}>
          На главную
        </Button>
      );
    }
  }

  renderRight() {
    const { session } = this.props;
    const items = [];

    if (session.exists) {
      items.push(
        <Button key={1} theme={['green', 'margins']} onClick={this.onClickLogout}>
          Выход
        </Button>,
      );
    } else {
      if (location.pathname === '/login') {
        items.push(
          <Button key={1} theme={['green', 'margins']} onClick={this.onClickRegistration}>
            Регистрация
          </Button>,
        );
      } else {
        items.push(
          <Button key={1} theme={['green', 'margins']} onClick={this.onClickRegistration}>
            Регистрация
          </Button>,
          <Button key={2} theme={['green', 'margins']} onClick={this.onClickLogin}>
            Вход
          </Button>,
        );
      }
    }
    return items;
  }

  render() {
    return <LayoutHeader left={this.renderLeft()} right={this.renderRight()} />;
  }
}

export default compose(
  withRouter,
  connect(state => ({
    session: state.session,
  })),
)(HeaderContainer);
