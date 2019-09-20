import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Modal } from 'antd';
import { Form, Input } from 'antx';
import Selector from '@/components/Selector';

@Form.create()
@connect(state => ({
  role: state.role,
  submitting: state.loading.effects['role/save'],
}))
export default class AOEForm extends Component {
  // 校验角色编码唯一性
  // eslint-disable-next-line consistent-return
  checkCode = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    const code = getFieldValue('code');
    const { item } = this.props;

    if (item && item.id && value === item.code) {
      return callback();
    }
    const data = { code };
    this.props
      .dispatch({
        type: 'role/checkUnique',
        payload: data,
      })
      .then(r => {
        if (r.success) {
          return callback();
        }
        return callback('编码已存在');
      });
  };

  // 关闭窗口
  handleCloseForm = () => {
    this.props.dispatch({
      type: 'role/updateState',
      payload: {
        modalType: '',
      },
    });
  };

  // 保存
  handleSaveClick = () => {
    const { dispatch, item } = this.props;
    const { getFieldsValue, validateFields } = this.props.form;
    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      };
      dispatch({
        type: 'role/save',
        payload: data,
      });
    });
  };

  // 渲染界面
  render() {
    const { modalType, operate } = this.props.role;
    const { loading, form } = this.props;

    const title = { create: '新增', edit: '编辑', view: '查看' };

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const formRowOne = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <Modal
        maskClosable={false}
        confirmLoading={loading}
        onCancel={() => this.handleCloseForm()}
        visible={modalType !== ''}
        width={600}
        onOk={() => this.handleSaveClick()}
        title={`${title[operate] || ''}角色`}
      >
        <Form api={form} {...formItemLayout} colon>
          {/* 第一行 */}
          <Row>
            <Col span={12}>
              <Input
                label="角色名称"
                id="name"
                rules={['required']}
                max={30}
                msg="full"
                disabled={operate === 'view'}
              />
            </Col>
            <Col span={12}>
              <Input
                label="角色编码"
                id="code"
                rules={[
                  {
                    required: true,
                    message: '路径格式错误或已存在',
                    whitespace: true,
                    pattern: /^[0-9a-zA-Z_]{4,16}$/,
                    validator: this.checkCode,
                  },
                ]}
                validateTrigger="onBlur"
                max={12}
                msg="full"
              />
            </Col>
          </Row>

          <Input
            textarea
            label="角色描述"
            id="remark"
            rules={['max=200']}
            max={60}
            msg="full"
            {...formRowOne}
          />

          <Selector
            label="数据权限"
            code="data_permission"
            id="permission"
            showAll={false}
            {...formRowOne}
            defaultValue="0000"
          />
        </Form>
      </Modal>
    );
  }
}
