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
