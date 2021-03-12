import React, { Component } from 'react';
import PropTypes from 'prop-types';
import themes from '@utils/themes';

import './style.less';

class RadioButton extends Component {
  static propTypes = {
    value: PropTypes.node.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    required: PropTypes.bool,
    focused: PropTypes.bool,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    autocomplete: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    checked: PropTypes.bool,
  };

  static defaultProps = {
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    disabled: false,
    type: 'text',
  };

  onChange = e => {
    const { onChange } = this.props;

    const value = e.target.value;
    return onChange(value);
  };

  onFocus = e => this.props.onFocus(e);

  onBlur = () => this.props.onBlur();

  render() {
    const {
      type,
      placeholder,
      required,
      focused,
      value,
      disabled,
      tabIndex,
      autocomplete,
      name,
      title,
      checked,
    } = this.props;

    return (
      <label className={themes('RadioButton', this.props.theme)}>
        <input
          className="RadioButton__input"
          value={value}
          type={type}
          name={name}
          placeholder={placeholder}
          tabIndex={tabIndex}
          disabled={disabled}
          checked={checked}
          required={required}
          autoFocus={focused}
          autoComplete={autocomplete ? 'on' : 'off'}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        <span className="RadioButton__label">{title}</span>
      </label>
    );
  }
}

export default RadioButton;
