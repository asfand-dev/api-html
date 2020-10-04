import React from 'react';
import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import { Button, Input } from 'antd';
import { FileTextTwoTone } from '@ant-design/icons';


export default () => (
  <div className="home-page page3">
    <div className="home-page-wrapper">
      <div className="title-line-wrapper page2-line">
        <div className="title-line" />
      </div>
      <h2>Preview or <span>Download</span> now</h2>
      <OverPack>
        <QueueAnim key="queue" type="bottom" leaveReverse className="zama-section">
          <div key="button" style={{marginTop: 20}}>
            <Input size="large" placeholder="URL to Swagger.json" prefix={<FileTextTwoTone />} style={{minWidth: 400}} />
            <div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
              <Button style={{ margin: '0 16px' }} type="primary" ghost>
                Preview
              </Button>
              <Button type="primary">
                Download
              </Button>
            </div>
          </div>
        </QueueAnim>
      </OverPack>
    </div>
  </div>
);