import React from 'react';
import Picker from '../../src';
import data from '../data/users';

class DropupExample extends React.Component {
  render() {
    return (
      <div className="example-item">
        <Picker
          data={data}
          defaultValue={['Julius']}
          dropup
        />
      </div>
    );
  }
}

export default DropupExample;
