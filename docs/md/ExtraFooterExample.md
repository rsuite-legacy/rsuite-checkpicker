在某些情况下，需要支持全选功能，或者需要在页脚放一个按钮，可以通过 `renderExtraFooter` 属性配置页脚渲染的内容。
```html
 <CheckPicker
    data={data}
    placeholder="请选择"
    ref={(ref) => {
      this.picker = ref;
    }}
    value={this.state.value}
    onChange={this.handleChange}
    renderExtraFooter={() => (
      <div style={footerStyles}>
        <Button
          shape="default"
          onClick={() => {
            this.picker.close();
          }}
        >
          确定
        </Button>
      </div>
    )}
  />

```
>[示例代码](https://github.com/rsuite/rsuite-checkpicker/blob/master/docs/examples/ExtraFooterExample.js)
