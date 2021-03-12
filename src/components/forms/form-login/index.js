import React, { Component } from 'react';
import PropTypes from 'prop-types';
import themes from '@utils/themes';
import LayoutField from '@components/layouts/layout-field';
import Input from '@components/elements/input';
import Error from '@components/elements/error';
import Button from '@components/elements/button';

import './style.less';

class FormLogin extends Component {
  static propTypes = {
    data: PropTypes.shape({
      login: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }).isRequired,
    errors: PropTypes.any,
    wait: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  };

  static defaultProps = {
    theme: ['default'],
    errors: {},
    onChange: () => {},
    onSubmit: () => {},
  };

  onChange = name => value => {
    const { data, onChange } = this.props;

    onChange({ ...data, [name]: value });
  };

  onSubmit = e => {
    const { data, onSubmit } = this.props;

    e.preventDefault();
    onSubmit({ ...data });
  };

  render() {
    const { data, errors, wait, theme } = this.props;

    return (
      <form className={themes('FormLogin', theme)} onSubmit={this.onSubmit}>
        <LayoutField
          input={
            <Input
              type="text"
              placeholder="Логин"
              value={data.login}
              onChange={this.onChange('login')}
            />
          }
          error={<Error errors={errors} path={'login'} />}
        />
        <LayoutField
          input={
            <Input
              type="password"
              placeholder="Пароль"
              value={data.password}
              onChange={this.onChange('password')}
            />
          }
          error={<Error errors={errors} path={'password'} />}
        />
        <LayoutField
          input={
            <Button theme="green" type="submit" disabled={wait}>
              Войти{wait && '...'}
            </Button>
          }
          error={<Error errors={errors} path={''} />}
        />
        <p style={{ fontSize: 12, color: '#aaa' }}>
          Это тестовая форма, для авторизации используйте: test@example.com / 123456
        </p>
      </form>
    );
  }
}

export default FormLogin;
