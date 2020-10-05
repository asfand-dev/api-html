import React, { useEffect, useState } from 'react';
import { enquireScreen } from 'enquire-js';

// import Header from './header';
import Banner from './banner';
import Feature from './features';
import Use from './use';
import Download from './download';
import Screenshot from './screenshot';
import Footer from './footer';
import '../assets/style/style';

let _isMobile;

enquireScreen((e) => {
  _isMobile = e;
});

export default () => {
  const [isMobile, setIsMobile] = useState(_isMobile || false);

  useEffect(() => {
    enquireScreen((e) => {
      setIsMobile(e);
    });

    // Warming up heroku app, because of free version go to sleep after 30 minutes of inavtiviry
    fetch('https://swagger-theme.herokuapp.com/generate-swagger?url=https://petstore.swagger.io/v2/swagger.json')
    .then(e => e.text())
    .then(e => e)
  }, []);
  
  return (
    <div>
      <div className="home-wrapper">
        <Banner isMobile={isMobile} />
        <Feature isMobile={isMobile} />
        <Screenshot />
        <Download />
        <Use />
      </div>
      <Footer />
    </div>
  );
};
