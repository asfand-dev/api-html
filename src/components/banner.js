import React from 'react';
import GitHubButton from 'react-github-button';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Button, Badge } from 'antd';
import BannerAnimation from './banner-animation';

export default ({ isMobile }) => (
  <div className="banner-wrapper">
    {isMobile && (
      <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
        <div className="home-banner-image">
          <img
            alt="banner"
            src="https://gw.alipayobjects.com/zos/rmsportal/rqKQOpnMxeJKngVvulsF.svg"
            width="100%"
          />
        </div>
      </TweenOne>
    )}
    <QueueAnim className="banner-title-wrapper" type={isMobile ? 'bottom' : 'right'}>
      <div key="line" className="title-line-wrapper">
        <div
          className="title-line"
          style={{ transform: 'translateX(-64px)' }}
        />
      </div>
      <h1 key="h1">Swagger Theme</h1>
      <p key="content">
        Convert your <Badge className="site-badge-count-109" count="swagger.json" style={{ backgroundColor: '#52c41a' }} /> file into an awesome html static website
      </p>
      <div key="button" className="button-wrapper">
        <Button type="primary">
            Download your swagger
        </Button>
        <Button style={{ margin: '0 16px' }} type="primary" ghost>
          Demo
        </Button>
      </div>
    </QueueAnim>
    {!isMobile && (
      <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
        <BannerAnimation />
      </TweenOne>
    )}
  </div>
);