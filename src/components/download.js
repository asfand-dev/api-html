import React, { useState } from 'react';
import { OverPack } from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import { Button, Input, Select, Tooltip, Checkbox } from 'antd';
import { FileTextTwoTone, ThunderboltTwoTone, CrownTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import ReactGA from 'react-ga';

export default () => {
  const [fieldValues, setFieldValues] = useState({
    type: 'swagger',
    version: 2,
    inputType: 'json',
    isBackToTopButton: true,
    isCoding: true,
    isSearch: true,
    isTryRequest: true,
    isCreditLink: true,
  });

  const [isAdvance, setIsAdvance] = useState(false);

  let fields = [
    {
      name: 'url',
      label: 'Source Url',
      type: 'text',
      icon: <FileTextTwoTone />,
      style: {maxWidth: '100%'},
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      style: {maxWidth: 'calc(50% - 5px)'},
      options: [['swagger', 'Swagger'], ['openapi', 'OpenAPI'], ['api_blueprint', 'API Blueprint'], ['io_docs', 'IO Docs'], ['google', 'Google API Descory'], ['raml', 'RAML'], ['wadl', 'WADL'] ],
    },
    {
      name: 'version',
      label: 'Version',
      type: 'select',
      style: {maxWidth: 'calc(50% - 5px)'},
      options: [[1], [2], [3]],
      swagger: true,
    },
    {
      name: 'inputType',
      label: 'Source Encoding',
      type: 'select',
      style: {maxWidth: 'calc(50% - 5px)'},
      options: [['json'], ['yaml']],
      swagger: true,
    },
    {
      name: 'logo',
      type: 'text',
      label: 'Logo Url / Local Logo Name',
      style: {maxWidth: 'calc(50% - 5px)'},
      tooltip: (
      <>
        <b>Local logo name</b> only works with the <b>Download</b> action, not with the <b>Preview</b> action.<br /> After downloading the <b>HTML</b> file, the logo file should be placed in the same folder, the path of local logo file should be relative to the <b>HTML</b> file.
      </>
      )
    },
    {
      name: 'baseColor',
      type: 'text',
      label: 'Base Color (RGB, Hexa or Color Name)',
      style: {maxWidth: 'calc(50% - 5px)'}
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Color (RGB, Hexa or Color Name)',
      style: {maxWidth: 'calc(50% - 5px)'} 
    },
    {
      name: 'pageTitle',
      type: 'text',
      label: 'Page Title',
      style: {maxWidth: '100%'},
      advance: true,
    },
    {
      name: 'pageTags',
      type: 'text',
      label: 'Page Meta Keywords',
      style: {maxWidth: '100%'},
      tooltip: 'Each keyword should be seperated by a comma. Meta Keywords are helpful for the SEO.',
      advance: true,
    },
    {
      name: 'pageDescription',
      type: 'textarea',
      label: 'Page Meta Description',
      advance: true,
    },
    {
      name: 'isBackToTopButton',
      type: 'checkbox',
      label: <><b>Back to top</b> button</>,
      style: {width: '100%'},
      value: true,
      advance: true,
    },
    {
      name: 'isCoding',
      type: 'checkbox',
      label: <><b>Coding</b> Section</>,
      style: {width: '100%'},
      advance: true,
    },
    {
      name: 'isSearch',
      type: 'checkbox',
      label: <><b>Search</b> Feature</>,
      style: {width: '100%'},
      advance: true,
    },
    {
      name: 'isTryRequest',
      type: 'checkbox',
      label: <><b>Try Request</b> feature</>,
      style: {width: '100%'},
      advance: true,
    },
    {
      name: 'isCreditLink',
      type: 'checkbox',
      label: <><b>Credit</b> link{fieldValues.isCreditLink ? '':<span>. Please <a href="http://paypal.me/asfanddev" target="_blank">donate</a> to support the project.</span>}</>,
      style: {width: '100%'},
      advance: true,
    },
    {
      name: 'customHeadScript',
      type: 'textarea',
      label: 'Custom Head Script, will be added to the head tag after all other scripts',
      style: {maxWidth: '100%'},
      advance: true,
    },
    {
      name: 'customFootScript',
      type: 'textarea',
      label: 'Custom Foot Script, will be added before ending tag of body.',
      style: {maxWidth: '100%'},
      advance: true,
    },
    {
      name: 'apiVersions',
      type: 'textarea',
      label: 'API Versions, enter in the following format:\n(Name)[URL]\n(Name)[URL]\n...\nExp:\n(V1)[https://zamacall.io/docs/v1/]\n(V2)[https://zamacall.io/docs/v2/]',
      style: {maxWidth: '100%'},
      rows: 8,
      advance: true,
    },
    {
      name: 'headerMenuItems',
      type: 'textarea',
      label: 'Header Menu Items, enter in the following format:\n(Name)[URL]\n(Name)[URL]\n...\nExp:\n(Main Website)[https://zamacall.io]\n(Contact Us)[https://zamacall.io/contact/]',
      style: {maxWidth: '100%'},
      rows: 8,
      advance: true,
    },
  ];

  const setFieldValue = (name, value) => {
    setFieldValues(e => ({ ...e, [name]: value }));
  }

  const objToQuery = (obj) => (
    Object.keys(obj).map(key => obj[key] ? `${key}=${encodeURIComponent(obj[key])}` : '').filter(e => e).join('&')
  );

  const getQuery = () => {
    const { 
      url,
      type,
      version,
      inputType,
      logo,
      baseColor,
      textColor,
      pageTitle,
      pageTags,
      pageDescription,
      isBackToTopButton,
      isCoding,
      isSearch,
      isTryRequest,
      isCreditLink,
      customHeadScript,
      customFootScript,
      apiVersions,
      headerMenuItems,
    } = fieldValues;

    const values = { url, type };

    if (type === 'swagger' || type === 'openapi') {
      if (inputType === 'yaml') {
        values.yaml = true;
      }

      if (version) { 
        values.version = version || 2;
      }
    }

    let options = {
      logo,
      baseColor,
      textColor,
      pageTitle,
      pageTags,
      pageDescription,
      isBackToTopButton,
      isCoding,
      isSearch,
      isTryRequest,
      isCreditLink,
      customHeadScript,
      customFootScript,
      apiVersions,
      headerMenuItems,
    };

    if (options) {
      values.options = JSON.stringify(options);
    }

    return objToQuery(values);
  };

  const previewHandler = () => {
    if (!fieldValues.url) return alert('Please enter a correct Source URL');
    const query = getQuery();
    window.open(`https://api-html.herokuapp.com/generate-html?${query}`, '_blank');

    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(`generate-html?${query}`);
    }
  }

  const downloadHandler = () => {
    if (!fieldValues.url) return alert('Please enter a correct Source URL');
    const query = getQuery();
    window.open(`https://api-html.herokuapp.com/generate-html?download=1&${query}`, '_blank');
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(`generate-html?download=1&${query}`);
    }
  }

  const importOptionsHandler = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = () => {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        reader.onload = (e = {}) => {
          const { target = {} } = e;
          const { result = {} } = target;
          try {
            const values = JSON.parse(result);
            setFieldValues(values);
          } catch (e) {}
        }

        reader.onerror = (evt) => {
          alert('Error importing file!');
        }
      }
    }
    fileInput.click();
  }

  const exportOptionsHandler = () => {
    const a = document.createElement('a');
    a.download = "api-html.json";
    a.target = '_blank';
    a.href = `data:application/json;base64,${btoa(JSON.stringify(fieldValues, null, 4))}`;
    a.click();
  }

  if (fieldValues.type !== 'swagger') {
    fields = fields.filter(({ swagger = false }) => !swagger);
  }

  if (!isAdvance) {
    fields = fields.filter(({ advance = false }) => !advance);
  }

  return (
    <div className="home-page download-section">
      <div className="home-page-wrapper">
        <div className="title-line-wrapper page2-line">
          <div className="title-line" />
        </div>
        <h2>Preview or <span>Download</span></h2>
        <OverPack>
          <QueueAnim key="queue" type="bottom" leaveReverse className="zama-section">
            <div key="button" style={{marginTop: 20}}>
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: 800}}>
                  {fields.map(({ name, type, icon, label, tooltip, style, options = [], rows = 5 }) => (
                    type === 'text' ? (
                      <Input
                        key={name}
                        size="large"
                        value={fieldValues[name] || ''}
                        onChange={e => setFieldValue(name, e.target.value)}
                        placeholder={label}
                        prefix={icon}
                        style={{marginTop: 10, ...style}}
                        suffix={tooltip ? (
                          <Tooltip title={tooltip}>
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                          </Tooltip>
                          ): (
                            null
                          )
                        }
                      />
                    ) : type === 'select' ? (
                      <Select
                        onChange={value => setFieldValue(name, value)}
                        size="large"
                        key={name}
                        placeholder={label}
                        style={{marginTop: 10, width: '100%', ...style}}
                        value={fieldValues[name] || ''}
                      >
                        <Select.Option key="default" value="">Select {label}</Select.Option>
                        {options.map(([name, value]) => <Select.Option key={name} value={name}>{value || name}</Select.Option>)}
                      </Select>
                    ) : type === 'textarea' ? (
                      <Input.TextArea
                        key={name}
                        size="large"
                        onChange={e => setFieldValue(name, e.target.value)}
                        placeholder={label}
                        style={{marginTop: 10, ...style}}
                        rows={rows}
                        value={fieldValues[name]}
                      />
                    ) : (
                      <Checkbox
                        key={name}
                        size="large"
                        onChange={e => setFieldValue(name, e.target.checked)}
                        checked={fieldValues[name] || false}
                        style={{marginTop: 10, ...style}}
                      >{label}</Checkbox>
                    )
                  ))}
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <span style={{ color: '#1891ff', cursor: 'pointer' }} onClick={exportOptionsHandler}>Export Options</span>
                  <span style={{padding: '0 10px'}}>|</span>
                  <span style={{ color: '#1891ff', cursor: 'pointer' }} onClick={importOptionsHandler}>Import Options</span>
                  <span style={{padding: '0 10px'}}>|</span>
                  <span style={{ color: '#1891ff', cursor: 'pointer' }} onClick={() => setIsAdvance(!isAdvance)}>Advance Options</span>
                </div>
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
