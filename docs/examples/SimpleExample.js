import React from 'react';
import CheckPicker from '../../src';
import data from '../data/users';

class SimpleExample extends React.Component {
  render() {
    return (
      <div className="example-item">
        <CheckPicker
          data={data}
          defaultValue={['Julius']}
          placeholder="请选择"
        />
        <br />
        <CheckPicker
          data={[
            { id: 1, text: 11 },
            { id: 2, text: 22 },
            { id: 3, text: 33 },
          ]}
          disabledItemValues={[1]}
          defaultValue={[2]}
          labelKey="text"
          valueKey="id"
          placeholder="请选择"
        />
      </div>
    );
  }
}

export default SimpleExample;
