import React from 'react';
import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import { Button, Badge } from 'antd';

export default () => (
  <div className="home-page page2">
    <div className="home-page-wrapper">
      <div className="title-line-wrapper page2-line">
        <div className="title-line" />
      </div>
      <h2><span>Build</span> Locally</h2>
      <OverPack>
        <QueueAnim key="queue" type="bottom" leaveReverse className="page2-content">
          <p key="p" className="page-content">
            Use our <Badge className="site-badge-count-109" count="CLI" style={{ backgroundColor: '#52c41a' }} /> tool to build locally or automate your deployment.
          </p>
          <div key="code1" className="home-code">
            <div>
              npm i <span>swagger-theme</span> -g
            </div>
            <div>swag --url https://petstore.swagger.io/v2/swagger.json</div>
            <div>
              <span className="home-code-comment">
                // The above command will generate the html files
              </span>
            </div>
            <div>
              <span className="home-code-comment">
                // <a href="https://www.npmjs.com/package/swagger-theme" target="_blank">View complete documentation</a>
              </span>
            </div>
          </div>
          <p key="p2" className="page-content">
            <a href="https://github.com/asfand-dev/swagger-theme-online/issues" target="_blank">Report an issue </a> | 
            <a href="https://github.com/asfand-dev/swagger-theme-online/issues" target="_blank"> Request a feature </a> | 
            <a href="mailto:asfand.dev@gmail.com"> Contact us </a>
          </p>
        </QueueAnim>
      </OverPack>
    </div>
  </div>
);