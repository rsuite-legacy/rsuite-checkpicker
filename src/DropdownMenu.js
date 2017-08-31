import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getPosition, scrollTop, getHeight } from 'dom-lib';
import classNames from 'classnames';
import decorate from './utils/decorate';

import DropdownMenuItemGroup from './DropdownMenuItemGroup';
import DropdownMenuItem from './DropdownMenuItem';

const propTypes = {
  data: PropTypes.array,
  group: PropTypes.bool,
  disabledItemValues: PropTypes.array,
  activeItemValues: PropTypes.any,
  focusItemValue: PropTypes.any,
  height: PropTypes.number,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  renderMenuItem: PropTypes.func,
  renderMenuItemGroup: PropTypes.func,
  onSelect: PropTypes.func,
  onItemGroupTitleClick: PropTypes.func,
};

const defaultProps = {
  data: [],
  disabledItemValues: [],
  height: 320,
  valueKey: 'value',
  labelKey: 'label'
};


class DropdownMenu extends React.Component {

  constructor(props) {
    super(props);
    this.menuItems = {};
  }

  componentDidMount() {
    this.updateScrollPoistion();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.focusItemValue, this.props.focusItemValue)) {
      this.updateScrollPoistion();
    }
  }

  updateScrollPoistion() {
    const activeItem = this.menuBodyContainer.querySelector('.hover');
    if (!activeItem) {
      return;
    }
    const position = getPosition(activeItem, this.menuBodyContainer);
    const sTop = scrollTop(this.menuBodyContainer);
    const sHeight = getHeight(this.menuBodyContainer);
    if (sTop > position.top) {
      scrollTop(this.menuBodyContainer, Math.max(0, position.top - 20));
    } else if (position.top > (sTop + sHeight)) {
      scrollTop(this.menuBodyContainer, Math.max(0, (position.top - sHeight) + 32));
    }

  }

  handleSelect = (value, checked, item, event) => {
    const { onSelect } = this.props;
    onSelect && onSelect(value, checked, item, event);
  }

  renderItems() {

    const {
      activeItemValues,
      focusItemValue,
      valueKey,
      labelKey,
      data,
      renderMenuItem,
      renderMenuItemGroup,
      onItemGroupTitleClick,
      disabledItemValues,
      group
    } = this.props;

    const createMenuItems = (items = [], groupId = 0) => (

      items.map((item, index) => {
        const value = item[valueKey];
        const label = item[labelKey];

        if (!label && !item.groupTitle) {
          throw Error(`labelKey "${labelKey}" is not defined in "data" : ${index}`);
        }

        // Use `value` in keys when If `value` is string or number
        const onlyKey = _.isString(value) || _.isNumber(value) ? value : index;

        /**
         * Render <DropdownMenuItemGroup>
         * when if `group` is enabled and `itme.children` is array
         */
        if (group && _.isArray(item.children)) {
          return (
            <DropdownMenuItemGroup
              key={onlyKey}
              title={
                renderMenuItemGroup ?
                  renderMenuItemGroup(item.groupTitle, item) :
                  item.groupTitle
              }
              onClick={onItemGroupTitleClick}
            >
              {createMenuItems(item.children, onlyKey)}
            </DropdownMenuItemGroup>
          );
        } else if (_.isUndefined(value) && !_.isArray(item.children)) {
          throw Error(`valueKey "${valueKey}" is not defined in "data" : ${index} `);
        }

        const disabled = disabledItemValues.some(disabledValue => (
          _.isEqual(disabledValue, value)
        ));

        return (
          <DropdownMenuItem
            getItemData={() => item}
            key={`${groupId}-${onlyKey}`}
            disabled={disabled}
            active={
              !_.isUndefined(activeItemValues) &&
              activeItemValues.some(v => _.isEqual(v, value))
            }
            hover={!_.isUndefined(focusItemValue) && _.eq(focusItemValue, value)}
            value={value}
            ref={(ref) => {
              if (ref && !disabled) {
                this.menuItems[`${groupId}-${onlyKey}`] = ref;
              }
            }}
            onSelect={(val, checked, event) => {
              this.handleSelect(val, checked, item, event);
            }}
          >
            {renderMenuItem ? renderMenuItem(label, item) : label}
          </DropdownMenuItem>
        );
      })
    );

    return createMenuItems(data);
  }

  render() {

    const {
      height,
      className,
      style,
      ...props
    } = this.props;

    const classes = classNames(this.prefix('dropdown-menu'), className);
    const elementProps = _.omit(props, Object.keys(propTypes));

    return (
      <div
        {...elementProps}
        className={classes}
        ref={(ref) => {
          this.menuBodyContainer = ref;
        }}
        style={{
          ...style,
          maxHeight: height,
        }}
      >
        <ul>
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default decorate()(DropdownMenu);
