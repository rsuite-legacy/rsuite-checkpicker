
```html
<CheckPicker
  data={data}
  defaultValue={['Julius']}
  placeholder="请选择"
/>
```
- 初始化一个 `CheckPicker`, 只需要设置一个 `data` 属性， 需要注意的 [data](https://github.com/rsuite/rsuite-checkpicker/blob/master/docs/data/users.js) 是一个数组;
- 数组中的选项包括 `label` 和 `value` 两个属性， `label` 是选项显示内容，`value` 是选项的值。 在`<CheckPicker>` 组件中对应有两个属性用于自定义这两个属性，分别是 `textKey` 和 `valueKey`, 默认值是 `label` 和 `value`。如果需要修改可以参考:

```html
<CheckPicker
  data={data}
  defaultValue={['Julius']}
  labelKey="text",
  valueKey="id"
/>
```


> [示例代码](https://github.com/rsuite/rsuite-checkpicker/blob/master/docs/SimpleExample.js)

