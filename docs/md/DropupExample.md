### Dropup

<!--start-code-->
```js
class DropupExample extends React.Component {
  render() {
    return (
      <div className="example-item">
        <CheckPicker
          data={data}
          defaultValue={['Julius']}
          dropup
        />
      </div>
    );
  }
}

ReactDOM.render(<DropupExample />);

```
<!--end-code-->

```html
<CheckPicker
  data={data}
  defaultValue={['Julius']}
  dropup
/>

```

- `autoAdjustPosition` 属性默认值为 `true`， 会自动根据当前 `<CheckPicker>` 的位置，自动调整是 `dropdown` 还是`dropup`。
- 如果配置手动配置 `dropup` 属性为 `ture`, 则 `<CheckPicker>` 只会向上展开。
