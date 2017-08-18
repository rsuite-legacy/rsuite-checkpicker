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
      </div>
    );
  }
}

export default SimpleExample;
