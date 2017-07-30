import React from 'react';
import classNames from 'classnames';

class DropdownToggle extends React.Component {
  render() {

    const {
      children,
      className,
      ...props
    } = this.props;

    const classes = classNames('toggle', className);

    return (
      <button
        {...props}
        type="button"
        className={classes}
      >
        <div className="toggle-placeholder" >
          {children}
        </div>
        <span className="toggle-arrow" />
      </button>
    );
  }
}

export default DropdownToggle;
