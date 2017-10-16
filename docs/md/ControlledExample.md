```html
<CheckPicker
  data={data}
  defaultValue={['Julius']}
/>
```
> 如果在非受控组件下设置默认值，通过 `defaultValue` 参数设置。

```html
<CheckPicker
  data={data}
  value={this.state.value}
  onChange={this.handleChange}
/>
```

> 当设置 `value` 以后，`<CheckPicker>` 就变成了一个受控组件，必须通过 `state` 来控制值的变化，在 `onChange` 回调函数中可以得到选择后的值，然后更新到 `state` 中。


>[示例代码](https://github.com/rsuite/rsuite-checkpicker/blob/master/docs/examples/ControlledExample.js)


