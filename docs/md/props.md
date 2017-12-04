## API


| Prop name             | Type                                                              | Default         | Description                 |
|-----------------------|-------------------------------------------------------------------|-----------------|-----------------------------|
| data                  | array                                                             |                 | 组件数据                        |
| groupBy               | string                                                            |                 | 设置分组条件在 `data` 中的 `key`     |
| valueKey              | string                                                            | `value`         | 设置选项值在 `data` 中的 `key`      |
| labelKey              | string                                                            | `label`         | 设置选项显示内容在 `data` 中的 `key`   |
| value                 | array                                                             |                 | 设置值 `受控`                    |
| defaultValue          | array                                                             |                 | 设置默认值  `非受控`                |
| height                | number                                                            | 320             | 设置 Dropdown 的高度             |
| dropup                | bool                                                              | false           | 向上展开                        |
| autoAdjustPosition    | bool                                                              | true            | 自动调节位置,但设置 `dropup` 后，该属性无效 |
| disabled              | bool                                                              |                 | 禁用组件                        |
| disabledItemValues    | array                                                             |                 | 禁用选项                        |
| onChange              | function(`value`:array, event)                                    |                 | `value` 发生改变时的回调函数          |
| onSelect              | function(`value`:array, `item`:object , event)                    |                 | 选项被点击选择后的回调函数               |
| onSearch              | function(`searchKeyword`:string, event)                           |                 | 搜索的回调函数                     |
| onItemGroupTitleClick | function(event)                                                   |                 | 点击分组标题的回调函数                 |
| placeholder           | string                                                            | `Please Select` | 占位符                         |
| renderPlaceholder     | function(`value`:array, `checkItems`:array, `placeholder`:string) |                 | 自定义被选中的选项                   |
| renderMenuItem        | function(`label`:string, `item`:object)                           |                 | 自定义选项                       |
| renderMenuItemGroup   | function(`groupTitle`:string, `item`:object)                      |                 | 自定义选项组                      |
| locale                | object                                                            |                 | 本地语言                        |
| searchable            | bool                                                              | true            | 可以搜索                        |
| cleanable             | bool                                                              | true            | 可以清除                        |
