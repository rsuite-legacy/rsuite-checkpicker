import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getUnhandledProps, prefix } from 'rsuite-utils/lib/utils';
import { namespace } from 'rsuite-utils/lib/Picker/constants';


class DropdownMenuItem extends React.Component {

  static propTypes = {
    classPrefix: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    onSelect: PropTypes.func,
    onKeyDown: PropTypes.func,
    focus: PropTypes.bool,
    title: PropTypes.string,
    getItemData: PropTypes.func
  };

  static defaultProps = {
    classPrefix: `${namespace}-check-menu-item`,
  };

  handleChange = (event) => {
    const { value, disabled, onSelect } = this.props;
    if (!disabled && onSelect) {
      onSelect(value, event.target.checked, event);
    }
  }

  render() {

    const {
      active,
      onKeyDown,
      disabled,
      focus,
      children,
      className,
      classPrefix,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('active')]: active,
      [addPrefix('focus')]: focus,
      [addPrefix('disabled')]: disabled
    });

    const unhandled = getUnhandledProps(DropdownMenuItem, rest);
    const input = (
      <span
        className={addPrefix('wrapper')}
      >
        <input
          checked={active}
          type="checkbox"
          disabled={disabled}
          onChange={this.handleChange}
        />
        <span className={addPrefix('inner')} />
      </span>
    );

    return (
      <li
        {...unhandled}
        className={className}
        role="menuitem"
      >
        <div
          className={addPrefix('checker')}
        >
          <label
            className={classes}
            tabIndex={-1}
            role="presentation"
            onKeyDown={disabled ? null : onKeyDown}
          >
            {input}
            {children}
          </label>
        </div>
      </li>
    );
  }
}

export default DropdownMenuItem;
