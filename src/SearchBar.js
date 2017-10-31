import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

const contextTypes = {
  locale: PropTypes.object
};

class SearchBar extends React.Component {

  handleChange = (event) => {
    const { onChange } = this.props;
    onChange && onChange(event.target.value, event);
  }

  render() {
    const {
      value,
      children,
      className,
      ...props
    } = this.props;

    const { locale = {} } = this.context || {};
    const elementProps = _.omit(props, Object.keys(propTypes));
    return (
      <div
        {...elementProps}
        className={classNames('search-bar', className)}
      >
        <input
          className="search-bar-input"
          value={value}
          onChange={this.handleChange}
          placeholder={locale.searchPlaceholder}
        />
        {children}
      </div>
    );
  }
}

SearchBar.propTypes = propTypes;
SearchBar.contextTypes = contextTypes;


export default SearchBar;
