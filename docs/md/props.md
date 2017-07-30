
Prop name             | Type              | Default   | Description
--------------------- | ----------------- | ----- | -----------------------------
data                  | array             |       |  组件数据
groupBy               | string            |       |  设置分组条件在 `data` 中的 `key`
valueKey              | string            |"value"|  设置选项值在 `data` 中的 `key`
labelKey              | string            |"label"|  设置选项显示内容在 `data` 中的 `key`
value                 | array             |       |  设置值 `受控`
defaultValue          | array             |       |  设置默认值  `非受控`
height                | number            | 320   |  设置 Dropdown 的高度
dropup                | bool              | false |  向上展开
autoAdjustPosition    | bool              | true  |  自动调节位置,但设置 `dropup` 后，该属性无效
disabled              | bool              |       |  禁用组件
disabledItemValues    | array             |       |  禁用选项
onChange              | function          |       |  `value` 发生改变时的回调函数
onSelect              | function          |       |  选项被点击选择后的回调函数
onSearch              | function          |       |  搜索的回调函数
onItemGroupTitleClick | function          |       |  点击分组标题的回调函数
renderPlaceholder     | function          |       |  自定义被选中的选项
renderMenuItem        | function          |       |  自定义选项
renderMenuItemGroup   | function          |       |  自定义选项组
locale                | object            |       |  本地语言
