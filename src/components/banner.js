import React from 'react';
import QueueAnim from 'rc-queue-anim';
import APIS_SVG from '../assets/img/apis.svg';

export default ({ isMobile }) => { 
  return (
    <div className="banner-wrapper">
      <QueueAnim className="banner-title-wrapper" type={isMobile ? 'bottom' : 'right'}>
        <h1 key="h1">API HTML</h1>
        <p key="content">
          Convert any API Specification into an awesome HTML documentation website
        </p>
        <img src={APIS_SVG} alt="APIs Flow"/>
      </QueueAnim>
    </div>
  );
};
