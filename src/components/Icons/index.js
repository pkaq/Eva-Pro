import React from 'react';
import { Modal } from 'antd';
import { icons } from 'core/common/AppInfo';
// 引入三方页面
const Icon = visible => {
  return (
    <Modal visible width={600} title="选择图标">
      {icons.map(item => <Icon type={item} />)}
    </Modal>
  );
};
export default Icon;
