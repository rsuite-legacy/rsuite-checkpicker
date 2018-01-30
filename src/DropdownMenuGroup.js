import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { toggleClass } from 'dom-lib';
import { getUnhandledProps, prefix } from 'rsuite-utils/lib/utils';
import { namespace } from 'rsuite-utils/lib/Picker/constants';


class DropdownMenuGroup extends React.Component {

  static propTypes = {
    title: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    classPrefix: PropTypes.string
  };

  static defaultProps = {
    classPrefix: `${namespace}-check-menu-group`,
  };

  handleClickGroup = (event) => {
    const { onClick, classPrefix } = this.props;
    toggleClass(this.DropdownMenuGroup, `${classPrefix}-closed`);
    onClick && onClick(event);
  }

  render() {

    const { title, children, classPrefix, className, ...rest } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(DropdownMenuGroup, rest);

    return (
      <li
        {...unhandled}
        className={classes}
        ref={(ref) => {
          this.DropdownMenuGroup = ref;
        }}
      >
        <div
          className={addPrefix('title')}
          role="menuitem"
          tabIndex={-1}
          onClick={this.handleClickGroup}
        >
          <span>{title}</span>
          <span className={addPrefix('caret')} />
        </div>
        <ul className={addPrefix('children')}>
          {children}
        </ul>
      </li>
    );
  }
}

export default DropdownMenuGroup;
