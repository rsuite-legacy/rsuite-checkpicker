import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';


const propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  onSelect: PropTypes.func,
  onKeyDown: PropTypes.func,
  hover: PropTypes.bool,
  title: PropTypes.string,
  getItemData: PropTypes.func
};

class DropdownMenuItem extends React.Component {
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
      hover,
      children,
      className,
      ...props
    } = this.props;

    const classes = classNames('menu-item', {
      active,
      hover,
      disabled
    });

    const elementProps = _.omit(props, Object.keys(propTypes));
    return (
      <li
        {...elementProps}
        className={className}
        role="menuitem"
      >
        <label
          className={classes}
          tabIndex={-1}
          role="presentation"
          onKeyDown={disabled ? null : onKeyDown}
        >

          <input
            type="checkbox"
            className="menu-item-checkbox"
            onChange={this.handleChange}
            checked={active}
          />
          {children}
        </label>
      </li>
    );
  }
}

DropdownMenuItem.propTypes = propTypes;

export default DropdownMenuItem;
