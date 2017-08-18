
```html
<CheckPicker
  data={data}
  defaultValue={['Julius']}
  groupBy="role"
  renderMenuItem={(label, item) => {
    return <span><i className="icon icon-user" /> {label}</span>;
  }}
  renderMenuItemGroup={(label, item) => {
    return (
      <span>
        <i className="icon icon-group" /> {label} - ({item.children.length})
      </span>
    );
  }}
  renderPlaceholder={(value, checkedItems, placeholder) => {
    if (!value.length) {
      return placeholder;
    }
    return (
      <span>
        <i className="icon icon-user" /> {value.join(' , ')}
      </span>
    );
  }}
/>

```
- `renderMenuItem` 回调函数可以自定义选项；
- `renderMenuItemGroup` 回调函数可以自定义选项组；
- `renderPlaceholder` 回调函数可以自定义被选中的选项。


>[示例代码](https://github.com/rsuite/rsuite-checkpicker/blob/master/docs/CustomExample.js)
