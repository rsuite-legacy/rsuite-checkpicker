import React from 'react';
import Picker from '../../src';
import data from '../data/users';

class GroupExample extends React.Component {
  render() {
    return (
      <div className="example-item">
        <Picker
          data={data}
          defaultValue={['Julius']}
          groupBy="role"
        />
      </div>
    );
  }
}

export default GroupExample;
