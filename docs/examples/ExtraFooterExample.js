import React from 'react';
import { Button, Checkbox } from 'rsuite';

import CheckPicker from '../../src';
import data from '../data/users';

const footerStyles = { padding: 10, textAlign: 'right', background: '#f5f5f5' };

class ExtraFooterExample extends React.Component {
  constructor() {
    super();
    this.state = {
      value: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({ value });
  }
  render() {
    return (
      <div className="example-item">
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
                shape="link"
                onClick={() => {
                  this.setState({
                    value: data.map(item => item.value)
                  });
                }}
              >
                全选
              </Button>


              <Button
                shape="link"
                onClick={() => {
                  this.setState({
                    value: []
                  });
                }}
              >
                取消全选
              </Button>

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
      </div>
    );
  }
}

export default ExtraFooterExample;
