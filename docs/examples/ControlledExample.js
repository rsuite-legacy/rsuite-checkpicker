import React from 'react';
import Picker from '../../src';
import data from '../data/users';

class SimpleExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ['Julius']
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <div className="example-item">
        <p><code>非受控</code></p>
        <Picker
          data={data}
          defaultValue={['Julius']}
        />
        <hr />
        <p><code>受控</code></p>
        <Picker
          data={data}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SimpleExample;
