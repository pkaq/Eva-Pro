import React from 'react';
// 引入三方页面
const ExtPage = ({ url, height }) => {
  return (
    <iframe
      src={url}
      width="100%"
      frameBorder={0}
      height={height && height !== '' ? height : '100%'}
    />
  );
};
export default ExtPage;
