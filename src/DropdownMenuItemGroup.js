import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { toggleClass } from 'dom-lib';
import _ from 'lodash';

const propTypes = {
  title: PropTypes.node.isRequired,
  onClick: PropTypes.func
};

class DropdownMenuItemGroup extends React.Component {

  handleClickGroup = (event) => {
    const { onClick } = this.props;
    toggleClass(this.DropdownMenuItemGroup, 'closed');
    onClick && onClick(event);
  }

  render() {

    const { title, children, className, ...props } = this.props;
    const classes = classNames('menu-item-group', className);
    const elementProps = _.omit(props, Object.keys(propTypes));

    return (
      <li
        {...elementProps}
        className={classes}
        ref={(ref) => {
          this.DropdownMenuItemGroup = ref;
        }}
      >
        <div
          className="menu-item-group-title"
          role="menuitem"
          tabIndex={-1}
          onClick={this.handleClickGroup}
        >
          <span>{title}</span>
          <span className="arrow" />
        </div>
        <ul className="menu-item-group-children">
          {children}
        </ul>
      </li>
    );
  }
}

DropdownMenuItemGroup.propTypes = propTypes;

export default DropdownMenuItemGroup;
