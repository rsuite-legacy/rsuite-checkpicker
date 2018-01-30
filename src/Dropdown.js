import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { IntlProvider, FormattedMessage } from 'rsuite-intl';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import {
  reactToString,
  filterNodesOfTree,
  getDataGroupBy,
  getUnhandledProps,
  prefix
} from 'rsuite-utils/lib/utils';

import {
  SearchBar,
  Toggle,
  MenuWrapper,
  constants
} from 'rsuite-utils/lib/Picker';


import DropdownMenu from './DropdownMenu';
import defaultLocale from './locale';

const { namespace } = constants;

class Dropdown extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    data: PropTypes.array,
    disabled: PropTypes.bool,
    disabledItemValues: PropTypes.array,
    height: PropTypes.number,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
    value: PropTypes.array,
    defaultValue: PropTypes.array,
    renderMenuItem: PropTypes.func,
    renderMenuGroup: PropTypes.func,
    renderExtraFooter: PropTypes.func,
    renderValue: PropTypes.func,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onGroupTitleClick: PropTypes.func,
    onSearch: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    /**
     * group by key in `data`
     */
    groupBy: PropTypes.any,
    placeholder: PropTypes.node,
    locale: PropTypes.object,
    searchable: PropTypes.bool,
    cleanable: PropTypes.bool,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    placement: PropTypes.oneOf([
      'bottomLeft', 'bottomRight', 'topLeft', 'topRight',
      'leftTop', 'rightTop', 'leftBottom', 'rightBottom'
    ])
  };

  static defaultProps = {
    classPrefix: `${namespace}-check`,
    data: [],
    disabledItemValues: [],
    height: 320,
    valueKey: 'value',
    labelKey: 'label',
    locale: defaultLocale,
    searchable: true,
    cleanable: true,
    placement: 'bottomLeft'
  };


  constructor(props) {
    super(props);
    const {
      data,
      value,
      defaultValue,
      groupBy,
      valueKey,
      labelKey
    } = props;

    const nextValue = _.clone(value || defaultValue) || [];

    this.state = {
      value: nextValue,
      // Used to hover the active item  when trigger `onKeydown`
      focusItemValue: nextValue ? nextValue[0] : undefined,
      searchKeyword: '',
      filteredData: data
    };

    if (groupBy === valueKey || groupBy === labelKey) {
      throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value, data } = nextProps;
    if (
      !_.isEqual(value, this.props.value) ||
      !_.isEqual(data, this.props.data)
    ) {
      this.setState({
        value,
        focusItemValue: value,
        filteredData: data
      });
    }
  }


  getFocusableMenuItems = () => {
    const { labelKey } = this.props;
    const { menuItems = {} } = this.menuContainer;
    if (!menuItems) {
      return [];
    }
    const items = Object.values(menuItems).map(item => item.props.getItemData());

    return filterNodesOfTree(items,
      item => this.shouldDisplay(item[labelKey])
    );
  }

  getValue() {
    const { value } = this.props;
    const nextValue = _.isUndefined(value) ? this.state.value : value;
    return _.clone(nextValue) || [];
  }

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  shouldDisplay(label) {

    const { searchKeyword } = this.state;
    if (!_.trim(searchKeyword)) {
      return true;
    }

    const keyword = searchKeyword.toLocaleLowerCase();

    if (typeof label === 'string' || typeof label === 'number') {
      return `${label}`.toLocaleLowerCase().indexOf(keyword) >= 0;
    } else if (React.isValidElement(label)) {
      const nodes = reactToString(label);
      return nodes.join('').toLocaleLowerCase().indexOf(keyword) >= 0;
    }
    return false;
  }

  findNode(focus) {
    const items = this.getFocusableMenuItems();
    const { valueKey } = this.props;
    const { focusItemValue } = this.state;

    for (let i = 0; i < items.length; i += 1) {
      if (_.eq(focusItemValue, items[i][valueKey])) {
        focus(items, i);
        return;
      }
    }

    focus(items, -1);
  }
  focusNextMenuItem() {
    const { valueKey } = this.props;
    this.findNode((items, index) => {
      const focusItem = items[index + 1];
      if (!_.isUndefined(focusItem)) {
        this.setState({ focusItemValue: focusItem[valueKey] });
      }
    });
  }
  focusPrevMenuItem() {
    const { valueKey } = this.props;
    this.findNode((items, index) => {
      const focusItem = items[index - 1];
      if (!_.isUndefined(focusItem)) {
        this.setState({ focusItemValue: focusItem[valueKey] });
      }
    });
  }

  selectFocusMenuItem(event) {
    const { onChange } = this.props;
    const value = this.getValue();
    const { focusItemValue } = this.state;

    if (!value.some(v => _.isEqual(v, focusItemValue))) {
      value.push(focusItemValue);
    } else {
      _.remove(value, itemVal => _.isEqual(itemVal, focusItemValue));
    }


    this.setState({ value }, () => {
      onChange && onChange(value, event);
    });
  }

  handleKeyDown = (event) => {

    if (!this.menuContainer) {
      return;
    }

    switch (event.keyCode) {
      // down
      case 40:
        this.focusNextMenuItem(event);
        event.preventDefault();
        break;
      // up
      case 38:
        this.focusPrevMenuItem(event);
        event.preventDefault();
        break;
      // enter
      case 13:
        this.selectFocusMenuItem(event);
        event.preventDefault();
        break;
      // esc | tab
      case 27:
      case 9:
        this.closeDropdown(event);
        event.preventDefault();
        break;
      default:
    }
  }

  handleSelect = (val, checked, item, event) => {
    const { onChange, onSelect } = this.props;
    const value = this.getValue();

    if (checked) {
      value.push(val);
    } else {
      _.remove(value, itemVal => _.isEqual(itemVal, val));
    }

    this.setState({
      value,
      focusItemValue: val
    }, () => {
      onSelect && onSelect(value, item, event);
      onChange && onChange(value, event);
    });
  }


  handleSearch = (searchKeyword, event) => {
    const { onSearch } = this.props;
    this.setState({ searchKeyword });
    onSearch && onSearch(searchKeyword, event);
  }

  closeDropdown = () => {
    const value = this.getValue();
    if (this.trigger) {
      this.trigger.hide();
    }
    this.setState({
      focusItemValue: value ? value[0] : undefined
    });
  }

  handleClean = (event) => {
    const { disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    this.setState({ value: [] }, () => {
      onChange && onChange([], event);
    });
  }

  addPrefix = name => prefix(this.props.classPrefix)(name)

  renderDropdownMenu() {
    const {
      data,
      labelKey,
      groupBy,
      searchable,
      renderExtraFooter,
      locale,
      placement
    } = this.props;

    const { focusItemValue } = this.state;

    const classes = classNames(
      this.addPrefix('menu'),
      `${namespace}-placement-${_.kebabCase(placement)}`
    );

    let filteredData = filterNodesOfTree(data,
      item => this.shouldDisplay(item[labelKey])
    );

    // Create a tree structure data when set `groupBy`
    if (groupBy) {
      filteredData = getDataGroupBy(filteredData, groupBy);
    }

    const menuProps = _.pick(
      this.props,
      DropdownMenu.handledProps.filter(name => name !== 'classPrefix')
    );
    return (
      <MenuWrapper
        className={classes}
      >
        {
          searchable ? (
            <SearchBar
              placeholder={locale.searchPlaceholder}
              onChange={this.handleSearch}
              value={this.state.searchKeyword}
            />
          ) : null
        }
        <DropdownMenu
          {...menuProps}
          ref={(ref) => {
            this.menuContainer = ref;
          }}
          activeItemValues={this.getValue()}
          focusItemValue={focusItemValue}
          data={filteredData}
          group={!_.isUndefined(groupBy)}
          onSelect={this.handleSelect}
        />
        {renderExtraFooter && renderExtraFooter()}
      </MenuWrapper>

    );
  }

  render() {
    const {
      data,
      valueKey,
      labelKey,
      className,
      placeholder,
      renderValue,
      disabled,
      cleanable,
      locale,
      classPrefix,
      onOpen,
      onClose,
      placement,
      open,
      defaultOpen,
      ...rest
    } = this.props;


    const unhandled = getUnhandledProps(Dropdown, rest);
    const value = this.getValue();
    const hasValue = !!value;

    let selectedLabel = (value && value.length) ? `${value.length} selected` : placeholder;
    if (renderValue) {
      selectedLabel = renderValue(
        value,
        data.filter(item => value.some(val => _.eq(item[valueKey], val)))
      );
    }

    const classes = classNames(classPrefix, {
      [this.addPrefix('has-value')]: hasValue,
      [this.addPrefix('disabled')]: disabled
    }, `${namespace}-placement-${_.kebabCase(placement)}`, className);

    return (
      <IntlProvider locale={locale}>
        <div
          {...unhandled}
          className={classes}
          onKeyDown={this.handleKeyDown}
          tabIndex={-1}
          role="menu"
          ref={(ref) => {
            this.container = ref;
          }}
        >
          <OverlayTrigger
            ref={(ref) => {
              this.trigger = ref;
            }}
            open={open}
            defaultOpen={defaultOpen}
            disabled={disabled}
            trigger="click"
            placement={placement}
            onEntered={onOpen}
            onExited={onClose}
            speaker={this.renderDropdownMenu()}
          >
            <Toggle
              onClean={this.handleClean}
              cleanable={cleanable && !disabled}
              hasValue={!!value && !!value.length}
            >
              {selectedLabel || <FormattedMessage id="placeholder" />}
            </Toggle>
          </OverlayTrigger>
        </div>
      </IntlProvider>
    );

  }
}

export default Dropdown;
