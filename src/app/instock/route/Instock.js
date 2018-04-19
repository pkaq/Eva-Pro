import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Form, Table, Input, InputNumber, Button, Card, DatePicker, Divider } from 'antd';
import PageHeaderLayout from 'core/layouts/PageHeaderLayout';
import style from './style.less';
import TableForm from './TableForm';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
/**
 * 进货单界面
 */
@Form.create()
@connect(state => ({
  instock: state.instock,
}))
export default class Instock extends PureComponent {
  componentDidMount() {
    console.info('instock loaded');
  }
  handleSave = () => {
    const { getFieldsValue, validateFields } = this.props.form;

    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
      };
      // 保存
      this.props.dispatch({
        type: 'instock/saveInstock',
        payload: data,
      });
    });
  };
  // 表单保存
  // 子表新增
  // 编辑
  // 删除

  render() {
    const { getFieldDecorator } = this.props.form;

    const formRowOne = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    return (
      <PageHeaderLayout title="采购入库单">
        <Form>
          <Card
            className={style.card}
            title={'入库详情 - RKD201808501'}
            extra={
              <div>
                <Button> 挂单 </Button>
                <Divider type="vertical" />
                <Button type="primary" onClick={() => this.handleSave()}>
                  {' '}
                  保存{' '}
                </Button>
              </div>
            }
          >
            {/*顶部已选列表*/}
            <Row gutter={16}>
              <Col span={6}>
                <FormItem label="入库日期" {...formRowOne}>
                  {getFieldDecorator('indate', {
                    initValue: moment.now(),
                    required: true,
                  })(<DatePicker showTime />)}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="承运人" {...formRowOne}>
                  {getFieldDecorator('shiped_person', {})(<Input />)}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="签收人" {...formRowOne}>
                  {getFieldDecorator('deliverd_person', {
                    required: true,
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
            {/*  第二行 */}
            <Row gutter={16}>
              <Col span={18}>
                <FormItem label="备注" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                  {getFieldDecorator('remark', {})(<TextArea />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
          <Card
            title="入库明细"
            extra={
              <Button icon="file-excel" type="danger">
                {' '}
                导入{' '}
              </Button>
            }
          >
            {getFieldDecorator('line', {
              initialValue: [],
            })(<TableForm />)}
          </Card>
        </Form>
      </PageHeaderLayout>
    );
  }
}
