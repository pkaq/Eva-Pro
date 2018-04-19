import React from 'react';
import ExtPage from 'components/ExtPage';
import PageHeaderLayout from 'core/layouts/PageHeaderLayout';

const Hystrix = () => {
  return (
    <PageHeaderLayout title="Hystrix">
      <ExtPage url="http://cn.bing.com" height="640" />
    </PageHeaderLayout>
  );
};
export default Hystrix;
