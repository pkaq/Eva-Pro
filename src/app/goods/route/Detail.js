import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Modal, Select } from 'antd';

const { Option } = { ...Select };

const FormItem = Form.Item;

// 表单项样式
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

// 表单配置项
const detail = ({
  item,
  onOk,
  form: { getFieldDecorator, validateFields, getFieldsValue },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      };
      onOk(data);
    });
  };
  // 窗口配置项
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '请输入商品名称',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="分类" hasFeedback {...formItemLayout}>
          {getFieldDecorator('category', {
            initialValue: item.category,
            rules: [
              {
                required: true,
                message: '请选择商品分类',
              },
            ],
          })(
            <Select hasFeedback {...formItemLayout}>
              <Option value="toy">玩具</Option>
              <Option value="omament">饰品</Option>
              <Option value="Yiminghe">工艺品</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="编码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [
              {
                message: '请输入正确的编码(仅限数字)',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="单位" hasFeedback {...formItemLayout}>
          {getFieldDecorator('unit', {
            initialValue: item.unit,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select hasFeedback {...formItemLayout}>
              <Option value="0001">件</Option>
              <Option value="0002">只</Option>
              <Option value="0003">套</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="装箱规格" hasFeedback {...formItemLayout}>
          {getFieldDecorator('spec', {
            initialValue: item.spec,
            rules: [
              {
                type: 'number',
                message: '请输入正确的装箱规格(仅限数字)',
              },
            ],
          })(<InputNumber />)}
        </FormItem>
        <FormItem label="条码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('qrcode', {
            initialValue: item.qrcode,
            rules: [
              {
                message: '请输入正确的条码(仅限数字)',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

detail.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create()(detail);
