import React from 'react';
import ReactDOM from 'react-dom';

import { Button } from 'rsuite';
import { Markdown } from 'react-markdown-reader';
import { PageContainer } from 'rsuite-docs';
import CodeView from 'react-code-view';

import './less/index.less';

import CheckPicker from '../src';
import data from './data/users';

class App extends React.Component {
  render() {

    return (
      <PageContainer
        githubURL="https://github.com/rsuite/rsuite-checkpicker"
        activeKey="CheckPicker"
      >

        <Markdown>
          {require('../README.md')}
        </Markdown>


        <h2>示例</h2>
        <CodeView
          dependencies={{
            data,
            CheckPicker
          }}
        >
          {require('./md/SimpleExample.md')}
        </CodeView>


        <CodeView
          dependencies={{
            data,
            CheckPicker
          }}
        >
          {require('./md/GroupExample.md')}
        </CodeView>


        <CodeView
          dependencies={{
            data,
            CheckPicker
          }}
        >
          {require('./md/DropupExample.md')}
        </CodeView>

        <CodeView
          dependencies={{
            data,
            CheckPicker
          }}
        >
          {require('./md/CustomExample.md')}
        </CodeView>


        <CodeView
          dependencies={{
            data,
            CheckPicker
          }}
        >
          {require('./md/ControlledExample.md')}
        </CodeView>

        <CodeView
          dependencies={{
            data,
            CheckPicker
          }}
        >
          {require('./md/DisabledExample.md')}
        </CodeView>


        <CodeView
          dependencies={{
            data,
            CheckPicker,
            Button
          }}
        >
          {require('./md/ExtraFooterExample.md')}
        </CodeView>

        <Markdown>
          {require('./md/props.md')}
        </Markdown>
      </PageContainer>
    );
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);
