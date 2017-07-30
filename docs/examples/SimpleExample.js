import React from 'react';
import Picker from '../../src';
import data from '../data/users';

class SimpleExample extends React.Component {
  render() {
    return (
      <div className="example-item">
        <Picker
          data={data}
          defaultValue={['Julius']}
        />
      </div>
    );
  }
}

export default SimpleExample;
