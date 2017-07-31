# rsuite-checkpicker  [![Travis][build-badge]][build] [![npm][npm-badge]][npm]


`rsuite-checkpicker` 是一个选择器组件，可以替代原生 `select` 控件。同时还具有一些特性：
- 支持搜索
- 支持自定选项
- 支持分组

> `rsuite-checkpicker` 只支持多选，如果只需要单选，可以使用 [`rsuite-selectpicker`](https://rsuitejs.com/rsuite-selectpicker)

## 快速开始

### 安装

```
npm i rsuite-checkpicker --save
```
### 样式

在 `less` 文件中引入:

```css
@import '~rsuite-checkpicker/lib/less/index.less';
```


### 示例

```jsx
import Picker from 'rsuite-checkpicker';

const data = [{
  label: 'Pearlie',
  value: 2,
  role: 'Master',
},...];

<Picker
  data={data}
  defaultValue={2}
  valueKey="value"     // `data` 数组中作为值的 `key`
  labelKey="label"     // `data` 数组中作为显示文本的 `key`
  groupBy="role"       // `data` 数组中作为分组显示的 `key`  如果不设置就不分组
/>
```


[build-badge]: https://travis-ci.org/rsuite/rsuite-checkpicker.svg?branch=master
[build]: https://travis-ci.org/rsuite/rsuite-checkpicker


[npm-badge]: https://badge.fury.io/js/rsuite-checkpicker.svg
[npm]: http://badge.fury.io/js/rsuite-checkpicker

