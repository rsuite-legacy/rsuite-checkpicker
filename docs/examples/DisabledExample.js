import React from 'react';
import Picker from '../../src';
import data from '../data/users';

class DisabledExample extends React.Component {
  render() {
    return (
      <div className="example-item">
        <p><code>禁用组件</code></p>
        <Picker
          data={data}
          defaultValue={['Julius']}
          disabled
        />
        <hr />
        <p><code>禁用选项</code></p>
        <Picker
          data={data}
          defaultValue={['Julius']}
          disabledItemValues={['Eugenia', 'Travon', 'Vincenza']}
        />
      </div>
    );
  }
}

export default DisabledExample;
