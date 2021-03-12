import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import themes from '@utils/themes';
import LayoutField from '@components/layouts/layout-field';
import Input from '@components/elements/input';
import RadioButton from '@components/elements/radio-button';
import Error from '@components/elements/error';
import Button from '@components/elements/button';

import './style.less';

class FormRegistration extends Component {
  static propTypes = {
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
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
      <form className={themes('FormRegistration', theme)} onSubmit={this.onSubmit}>
        <h3 className="FormRegistration__title">Регистрация</h3>
        <LayoutField
          label={'Имя'}
          input={<Input type="text" value={data.name} onChange={this.onChange('name')} required />}
          error={<Error errors={errors} path={'name'} />}
        />
        <LayoutField
          label={'Почта'}
          input={
            <Input type="text" value={data.login} onChange={this.onChange('login')} required />
          }
          error={<Error errors={errors} path={'login'} />}
        />
        <LayoutField
          label={'Пароль'}
          input={
            <Input
              type="password"
              value={data.password}
              onChange={this.onChange('password')}
              required
            />
          }
          error={<Error errors={errors} path={'password'} />}
        />
        <LayoutField
          label={'Пол'}
          input={
            <Fragment>
              <RadioButton
                type="radio"
                name="gender"
                value="male"
                theme="radio"
                title="Мужчина"
                onChange={this.onChange('gender')}
                checked={data.gender === 'male'}
              />
              <RadioButton
                type="radio"
                name="gender"
                value="female"
                theme="radio"
                title="Женщина"
                onChange={this.onChange('gender')}
                checked={data.gender === 'female'}
              />
            </Fragment>
          }
          error={<Error errors={errors} path={'gender'} />}
        />
        <LayoutField
          input={
            <Button theme="green" type="submit" disabled={wait}>
              Зарегистрироваться{wait && '...'}
            </Button>
          }
          error={<Error errors={errors} path={''} />}
        />
        <p style={{ fontSize: 12, color: '#aaa' }}>
          Это тестовая форма, регистрация никуда не отправляется
        </p>
      </form>
    );
  }
}

export default FormRegistration;
