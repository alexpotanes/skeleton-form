import React, { Component } from 'react';
import PropTypes from 'prop-types';
import themes from '@utils/themes';

import './style.less';

class RadioButton extends Component {
  static propTypes = {
    value: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    checked: PropTypes.bool,
  };

  static defaultProps = {
    onChange: () => {},
    disabled: false,
    checked: false,
  };

  onChange = e => {
    const { onChange } = this.props;
    const value = e.target.value;
    return onChange(value);
  };

  render() {
    const { value, disabled, name, title, checked } = this.props;

    return (
      <label className={themes('RadioButton', this.props.theme)}>
        <input
          className="RadioButton__input"
          value={value}
          type="radio"
          name={name}
          disabled={disabled}
          checked={checked}
          onChange={this.onChange}
        />
        <span className="RadioButton__label">{title}</span>
      </label>
    );
  }
}

export default RadioButton;
