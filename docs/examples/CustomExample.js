import React from 'react';
import Picker from '../../src';
import data from '../data/users';

class CustomExample extends React.Component {
  render() {
    return (
      <div className="example-item">
        <Picker
          data={data}
          defaultValue={['Julius']}
          groupBy="role"
          renderMenuItem={(label, item) => {
            return <span><i className="icon icon-user" /> {label}</span>;
          }}
          renderMenuItemGroup={(label, item) => {
            return (
              <span>
                <i className="icon icon-group" /> {label} - ({item.children.length})
              </span>
            );
          }}
          renderPlaceholder={(placeholder, checkedItems) => {
            return (
              <span>
                <i className="icon icon-user" /> {placeholder.join(' , ')}
              </span>
            );
          }}
        />

      </div>
    );
  }
}

export default CustomExample;
