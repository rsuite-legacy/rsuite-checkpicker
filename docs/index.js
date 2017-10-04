import React from 'react';
import ReactDOM from 'react-dom';

import { Header, Navbar, Nav, Row, Col } from 'rsuite';
import { Markdown } from 'markdownloader';
import Affix from 'rsuite-affix';

import './less/index.less';

import SimpleExample from './examples/SimpleExample';
import GroupExample from './examples/GroupExample';
import DropupExample from './examples/DropupExample';
import CustomExample from './examples/CustomExample';
import ControlledExample from './examples/ControlledExample';
import DisabledExample from './examples/DisabledExample';
import ExtraFooterExample from './examples/ExtraFooterExample';

const App = React.createClass({
  render() {

    return (
      <div className="doc-page">
        <Header inverse>
          <div className="container">
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">RSUITE CheckPicker</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <Nav.Item href="https://rsuite.github.io">RSuite</Nav.Item>
                <Nav.Item href="https://github.com/rsuite/rsuite-checkpicker">GitHub</Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Header>

        <div className="container">

          <Row>
            <Col md={2} xsHidden smHidden>
              <Affix offsetTop={70}>
                <Nav className="sidebar">
                  <Nav.Item href="#readme">概述</Nav.Item>
                  <Nav.Item href="#default">示例</Nav.Item>
                  <Nav.Item href="#default">&nbsp;&nbsp;- 默认</Nav.Item>
                  <Nav.Item href="#group">&nbsp;&nbsp;- 分组</Nav.Item>
                  <Nav.Item href="#dropup">&nbsp;&nbsp;- Dropup</Nav.Item>
                  <Nav.Item href="#custom">&nbsp;&nbsp;- 自定义选项</Nav.Item>
                  <Nav.Item href="#controlled">&nbsp;&nbsp;- 非受控与受控</Nav.Item>
                  <Nav.Item href="#disabled">&nbsp;&nbsp;- 禁用</Nav.Item>
                  <Nav.Item href="#extrafooter">&nbsp;&nbsp;- 额外的页脚</Nav.Item>
                  <Nav.Item href="#api">API</Nav.Item>
                </Nav>
              </Affix>
            </Col>
            <Col md={10}>

              <hr id="readme" className="target-fix" />
              <Markdown>
                {require('../README.md')}
              </Markdown>

              <hr id="default" className="target-fix" />
              <h2>示例</h2>
              <h3>默认</h3>
              <Row>
                <Col md={12}>
                  <SimpleExample />
                  <Markdown>
                    {require('./md/SimpleExample.md')}
                  </Markdown>
                </Col>
              </Row>
              <hr id="group" className="target-fix" />
              <h3 >分组</h3>
              <Row>
                <Col md={12}>
                  <GroupExample />
                  <Markdown>
                    {require('./md/GroupExample.md')}
                  </Markdown>
                </Col>
              </Row>

              <hr id="dropup" className="target-fix" />
              <h3 >Dropup</h3>
              <Row>
                <Col md={12}>
                  <DropupExample />
                  <Markdown>
                    {require('./md/DropupExample.md')}
                  </Markdown>
                </Col>
              </Row>

              <hr id="custom" className="target-fix" />
              <h3 >自定义选项</h3>
              <Row>
                <Col md={12}>
                  <CustomExample />
                  <Markdown>
                    {require('./md/CustomExample.md')}
                  </Markdown>
                </Col>
              </Row>

              <hr id="controlled" className="target-fix" />
              <h3 >非受控与受控</h3>
              <Row>
                <Col md={12}>
                  <ControlledExample />
                  <Markdown>
                    {require('./md/ControlledExample.md')}
                  </Markdown>
                </Col>
              </Row>

              <hr id="disabled" className="target-fix" />
              <h3>禁用</h3>
              <Row>
                <Col md={12}>
                  <DisabledExample />
                  <Markdown>
                    {require('./md/DisabledExample.md')}
                  </Markdown>
                </Col>
              </Row>

              <hr id="extrafooter" className="target-fix" />
              <h3>额外的页脚</h3>
              <Row>
                <Col md={12}>
                  <ExtraFooterExample />
                  <Markdown>
                    {require('./md/ExtraFooterExample.md')}
                  </Markdown>
                </Col>
              </Row>

              <hr />
              <a href="https://github.com/rsuite/rsuite-checkpicker/tree/master/examples" target="_blank">
                更多示例
              </a>

              <hr id="api" className="target-fix" />
              <h2><code>{'# API'}</code></h2>
              <Markdown>
                {require('./md/props.md')}
              </Markdown>
            </Col>
          </Row>

        </div>
      </div>
    );
  }
});

ReactDOM.render(<App />,
  document.getElementById('app')
);
