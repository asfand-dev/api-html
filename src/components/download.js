import React, { useState } from 'react';
import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import { Button, Input } from 'antd';
import { FileTextTwoTone, ThunderboltTwoTone, CrownTwoTone } from '@ant-design/icons';


export default () => {
  const [url, setUrl] = useState('');
  const [logo, setLogo] = useState('');
  const [color, setColor] = useState('');
  const [showOption, setShowOption] = useState(false);

  const getOptions = () => {
    let options = {};
    if (color) { options.baseColor = color }
    if (logo) { options.logo = logo }
    return Object.keys(options).length ? `&options=${encodeURI(JSON.stringify(options))}` : '';
  };

  const previewHandler = () => {
    if (url.lastIndexOf('.json') > 3) {
      window.open(`https://swagger-theme.herokuapp.com/generate-swagger?url=${url}${getOptions()}`, '_blank');
    } else {
      alert('Please enter a correct your with .json extension');
    }
  }

  const downloadHandler = () => {
    if (url.lastIndexOf('.json') > 3) {
      window.open(`https://swagger-theme.herokuapp.com/generate-swagger?url=${url}&download=1${getOptions()}`, '_blank');
    } else {
      alert('Please enter a correct your with .json extension');
    }
  }
  return (
    <div className="home-page page3 download-section">
      <div className="home-page-wrapper">
        <div className="title-line-wrapper page2-line">
          <div className="title-line" />
        </div>
        <h2>Preview or <span>Download</span> now</h2>
        <OverPack>
          <QueueAnim key="queue" type="bottom" leaveReverse className="zama-section">
            <div key="button" style={{marginTop: 20}}>
              <Input size="large" onChange={e => setUrl(e.target.value)} placeholder="URL to Swagger.json" prefix={<FileTextTwoTone />} style={{minWidth: 400}} />
              {!showOption ? (
                <span style={{float: 'right', color: '#1891ff', cursor: 'pointer' }} onClick={() => setShowOption(true)}>Options</span>
              ) : (
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10}}>
                  <Input size="middle" onChange={e => setLogo(e.target.value)} placeholder="Logo Url" prefix={<CrownTwoTone />} style={{maxWidth: 275}} />
                  <Input size="middle" onChange={e => setColor(e.target.value)} placeholder="Base Color" prefix={<ThunderboltTwoTone />} style={{maxWidth: 120}} />
                </div>
              )}
              <div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
                <Button onClick={previewHandler} style={{ margin: '0 16px' }} type="primary" ghost>
                  Preview
                </Button>
                <Button onClick={downloadHandler} type="primary">
                  Download
                </Button>
              </div>
            </div>
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
};
