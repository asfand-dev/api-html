
import React from 'react';
import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';

import SCREENSHOT_PNG from '../assets/img/screenshot.png';

export default () => (
  <div className="home-page page3">
    <div className="home-page-wrapper">
      <div className="title-line-wrapper page2-line">
        <div className="title-line" />
      </div>
      <h2>Screenshot of <span>Pet Store</span></h2>
      <OverPack>
        <QueueAnim key="queue" type="bottom" leaveReverse className="zama-section">
          <div key="button" style={{marginTop: 20}}>
            <img src={SCREENSHOT_PNG} style={{maxWidth: 800}} alt='swagger theme screenshot' />
          </div>
        </QueueAnim>
      </OverPack>
    </div>
  </div>
);